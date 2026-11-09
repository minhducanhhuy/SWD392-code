import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * UC-01: Them san pham vao gio hang voi kiem tra ton kho & gioi han (BR-04, BR-09, BR-27, BR-29)
   */
  async addItemToCart(dto: AddCartItemDto) {
    const { sessionId, variantId, quantity, comboId, comboGroupId } = dto;

    // 1. Kiem tra bien the san pham co ton tai va con hoat dong khong (PRE-1, BR-29)
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    if (!variant || !variant.product || !variant.product.isActive) {
      throw new NotFoundException('Bien the san pham khong ton tai hoac da bi an.');
    }

    if (variant.stockQty <= 0) {
      throw new BadRequestException('BR-29: San pham da het hang trong kho.');
    }

    // 2. Kiem tra gio hang hien tai cua session cho bien the nay
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        sessionId,
        variantId,
        comboGroupId: comboGroupId || null,
      },
    });

    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    const newTotalQty = currentQtyInCart + quantity;

    // 3. Kiem tra BR-09: Toi da 10 don vi cho cung mot bien the trong mot gio hang
    if (newTotalQty > 10) {
      throw new BadRequestException(
        `BR-09: Gioi han toi da 10 san pham cung bien the trong gio hang (hien co: ${currentQtyInCart}, them: ${quantity}).`,
      );
    }

    // 4. Kiem tra BR-27: Kiem tra voi so luong ton kho kha dung
    if (newTotalQty > variant.stockQty) {
      throw new BadRequestException(
        `BR-27: So luong yeu cau (${newTotalQty}) vuot qua so luong ton kho con lai (${variant.stockQty}).`,
      );
    }

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newTotalQty },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          sessionId,
          variantId,
          quantity,
          comboId,
          comboGroupId,
        },
      });
    }

    return this.getCartSummary(sessionId);
  }

  /**
   * UC-02: Lay danh sach va thong ke gio hang (BR-04, BR-05)
   */
  async getCartSummary(sessionId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    let rawSubtotal = 0;
    let comboDiscountTotal = 0;

    // Tinh tong tien goc theo tung dong san pham
    const formattedItems = items.map((item) => {
      const unitPrice = item.variant.price ?? item.variant.product.basePrice;
      const lineTotal = unitPrice * item.quantity;
      rawSubtotal += lineTotal;

      return {
        id: item.id,
        variantId: item.variantId,
        productName: item.variant.product.name,
        color: item.variant.color,
        size: item.variant.size,
        sku: item.variant.sku,
        image: item.variant.product.images[0] || null,
        unitPrice,
        quantity: item.quantity,
        lineTotal,
        stockQty: item.variant.stockQty,
        comboId: item.comboId,
        comboGroupId: item.comboGroupId,
      };
    });

    // UC-02 / BR-05: Tinh giam gia Combo neu cac san pham thuoc Combo duoc them
    // Kiem tra cac comboGroupId
    const comboGroupIds = Array.from(
      new Set(items.map((i) => i.comboGroupId).filter(Boolean)),
    ) as string[];

    for (const cGroupId of comboGroupIds) {
      const groupItems = items.filter((i) => i.comboGroupId === cGroupId);
      if (groupItems.length > 0 && groupItems[0].comboId) {
        const combo = await this.prisma.combo.findUnique({
          where: { id: groupItems[0].comboId },
        });

        if (combo && combo.isActive) {
          const groupRawTotal = groupItems.reduce((acc, curr) => {
            const p = curr.variant.price ?? curr.variant.product.basePrice;
            return acc + p * curr.quantity;
          }, 0);

          let discountForGroup = 0;
          if (combo.discountType === 'PERCENTAGE') {
            discountForGroup = (groupRawTotal * combo.discountVal) / 100;
          } else if (combo.discountType === 'FIXED_AMOUNT') {
            discountForGroup = combo.discountVal;
          } else if (combo.discountType === 'BUNDLE_PRICE' && combo.bundlePrice) {
            discountForGroup = Math.max(0, groupRawTotal - combo.bundlePrice);
          }

          comboDiscountTotal += discountForGroup;
        }
      }
    }

    // BR-04: Tong tien = Tong gia san pham - Giam gia combo
    const finalSubtotal = Math.max(0, rawSubtotal - comboDiscountTotal);

    return {
      sessionId,
      totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
      rawSubtotal,
      comboDiscountTotal,
      finalSubtotal,
      items: formattedItems,
    };
  }

  /**
   * UC-02: Cap nhat so luong san pham trong gio hang (BR-09, BR-27)
   */
  async updateItemQuantity(itemId: string, dto: UpdateCartItemDto) {
    const { quantity } = dto;

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { variant: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Item khong ton tai trong gio hang.');
    }

    if (quantity > 10) {
      throw new BadRequestException(
        'BR-09: Khong the vuot qua 10 don vi cho cung mot bien the trong gio hang.',
      );
    }

    if (quantity > cartItem.variant.stockQty) {
      throw new BadRequestException(
        `BR-27: So luong yeu cau (${quantity}) vuot qua ton kho (${cartItem.variant.stockQty}).`,
      );
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return this.getCartSummary(cartItem.sessionId);
  }

  /**
   * UC-02: Xoa 1 san pham khoi gio hang
   */
  async removeItem(itemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Item khong ton tai trong gio hang.');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return this.getCartSummary(cartItem.sessionId);
  }

  /**
   * UC-02: Xoa toan bo gio hang
   */
  async clearCart(sessionId: string) {
    await this.prisma.cartItem.deleteMany({
      where: { sessionId },
    });

    return {
      sessionId,
      totalItems: 0,
      rawSubtotal: 0,
      comboDiscountTotal: 0,
      finalSubtotal: 0,
      items: [],
    };
  }
}

