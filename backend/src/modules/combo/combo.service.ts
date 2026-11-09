import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { AddComboToCartDto } from './dto/add-combo-to-cart.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ComboService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
  ) {}

  /**
   * UC-03: Lay danh sach cac Combo dang hoat dong cho khach hang (Storefront) (BR-05, BR-10, BR-35)
   */
  async getActiveCombos() {
    const now = new Date();

    const combos = await this.prisma.combo.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: {
                  where: { stockQty: { gt: 0 } },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return combos.map((combo) => this.formatComboDetails(combo));
  }

  /**
   * UC-03: Lay chi tiet 1 Combo theo ID
   */
  async getComboById(id: string) {
    const combo = await this.prisma.combo.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true,
              },
            },
          },
        },
      },
    });

    if (!combo) {
      throw new NotFoundException('Combo khong ton tai');
    }

    return this.formatComboDetails(combo);
  }

  /**
   * UC-04: Them tron goi Combo vao gio hang (BR-04, BR-05, BR-09, BR-10, BR-27)
   */
  async addComboToCart(dto: AddComboToCartDto) {
    const { sessionId, comboId, selectedVariants } = dto;

    const combo = await this.prisma.combo.findUnique({
      where: { id: comboId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!combo || !combo.isActive) {
      throw new BadRequestException('Combo khong ton tai hoac khong con hoat dong.');
    }

    const now = new Date();
    if (now < combo.startDate || now > combo.endDate) {
      throw new BadRequestException('Combo da het han hoac chua bat dau.');
    }

    // Kiem tra du cac san pham trong combo
    if (selectedVariants.length < combo.items.length) {
      throw new BadRequestException('Vui long chon day du bien the (mau/size) cho tat ca san pham trong combo.');
    }

    // Tao mot comboGroupId de nhom cac san pham cua goi combo nay trong gio hang
    const comboGroupId = randomUUID();

    // Duyet qua tung bien the va them vao gio hang voi comboId va comboGroupId
    for (const itemSelection of selectedVariants) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: itemSelection.variantId },
      });

      if (!variant) {
        throw new NotFoundException(`Bien the ${itemSelection.variantId} khong ton tai.`);
      }

      if (variant.stockQty < 1) {
        throw new BadRequestException(
          `BR-27: Bien the san pham SKU ${variant.sku} da het hang, khong the them combo.`,
        );
      }

      await this.cartService.addItemToCart({
        sessionId,
        variantId: itemSelection.variantId,
        quantity: 1,
        comboId: combo.id,
        comboGroupId,
      });
    }

    return this.cartService.getCartSummary(sessionId);
  }

  /**
   * UC-06: Quan ly Combos - Lay toan bo danh sach Combo (Admin/Staff)
   */
  async getAllCombosForAdmin() {
    const combos = await this.prisma.combo.findMany({
      include: {
        items: {
          include: {
            product: {
              include: { variants: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return combos.map((combo) => this.formatComboDetails(combo));
  }

  /**
   * UC-06: Quan ly Combos - Tao moi Combo (BR-10, BR-35)
   */
  async createCombo(dto: CreateComboDto) {
    const { name, code, description, discountType, discountVal, bundlePrice, startDate, endDate, items } = dto;

    // BR-35: Kiem tra thoi gian bat dau va ket thuc
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      throw new BadRequestException('BR-35: Ngay ket thuc phai lon hon ngay bat dau cua Combo.');
    }

    // Kiem tra trung ma code
    const existingCode = await this.prisma.combo.findUnique({
      where: { code },
    });
    if (existingCode) {
      throw new ConflictException(`Ma Combo "${code}" da ton tai.`);
    }

    // BR-10: Chong trung Combo (Anti-Combo Duplication):
    // 1 san pham khong duoc nam trong hon 01 Combo "Active" tai cung mot thoi diem
    const productIds = items.map((i) => i.productId);
    await this.validateAntiComboDuplication(productIds, start, end);

    const newCombo = await this.prisma.combo.create({
      data: {
        name,
        code,
        description,
        discountType,
        discountVal,
        bundlePrice,
        startDate: start,
        endDate: end,
        isActive: true,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return this.formatComboDetails(newCombo);
  }

  /**
   * UC-06: Quan ly Combos - Cap nhat Combo (BR-10, BR-35)
   */
  async updateCombo(id: string, dto: UpdateComboDto) {
    const existing = await this.prisma.combo.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existing) {
      throw new NotFoundException('Combo khong ton tai.');
    }

    const start = dto.startDate ? new Date(dto.startDate) : existing.startDate;
    const end = dto.endDate ? new Date(dto.endDate) : existing.endDate;

    if (end <= start) {
      throw new BadRequestException('BR-35: Ngay ket thuc phai lon hon ngay bat dau.');
    }

    // Neu co cap nhat items, kiem tra BR-10
    if (dto.items && dto.items.length > 0) {
      const productIds = dto.items.map((i) => i.productId);
      await this.validateAntiComboDuplication(productIds, start, end, id);
    }

    // Cap nhat
    const updated = await this.prisma.$transaction(async (tx) => {
      if (dto.items) {
        await tx.comboItem.deleteMany({ where: { comboId: id } });
        await tx.comboItem.createMany({
          data: dto.items.map((it) => ({
            comboId: id,
            productId: it.productId,
            quantity: it.quantity,
          })),
        });
      }

      return tx.combo.update({
        where: { id },
        data: {
          name: dto.name,
          code: dto.code,
          description: dto.description,
          discountType: dto.discountType,
          discountVal: dto.discountVal,
          bundlePrice: dto.bundlePrice,
          startDate: start,
          endDate: end,
          isActive: dto.isActive,
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    });

    return this.formatComboDetails(updated);
  }

  /**
   * UC-06: Bat/Tat trang thai Combo (BR-10)
   */
  async toggleComboStatus(id: string) {
    const combo = await this.prisma.combo.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!combo) {
      throw new NotFoundException('Combo khong ton tai.');
    }

    const nextStatus = !combo.isActive;
    if (nextStatus) {
      // Khi kich hoat lai, kiem tra xem co vi pham BR-10 khong
      const productIds = combo.items.map((i) => i.productId);
      await this.validateAntiComboDuplication(productIds, combo.startDate, combo.endDate, id);
    }

    const updated = await this.prisma.combo.update({
      where: { id },
      data: { isActive: nextStatus },
      include: {
        items: { include: { product: true } },
      },
    });

    return this.formatComboDetails(updated);
  }

  /**
   * UC-06: Xoa Combo
   */
  async deleteCombo(id: string) {
    const combo = await this.prisma.combo.findUnique({ where: { id } });
    if (!combo) {
      throw new NotFoundException('Combo khong ton tai.');
    }

    await this.prisma.combo.delete({ where: { id } });
    return { success: true, message: `Da xoa thanh cong combo "${combo.name}".` };
  }

  /**
   * Kiem tra BR-10: 1 san pham khong duoc nam trong hon 01 Combo Active
   */
  private async validateAntiComboDuplication(
    productIds: string[],
    startDate: Date,
    endDate: Date,
    excludeComboId?: string,
  ) {
    const activeCombos = await this.prisma.combo.findMany({
      where: {
        isActive: true,
        id: excludeComboId ? { not: excludeComboId } : undefined,
        startDate: { lte: endDate },
        endDate: { gte: startDate },
        items: {
          some: {
            productId: { in: productIds },
          },
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (activeCombos.length > 0) {
      const conflictCombo = activeCombos[0];
      const conflictProduct = conflictCombo.items.find((i) => productIds.includes(i.productId));
      throw new ConflictException(
        `BR-10: San pham "${conflictProduct?.product.name}" da nam trong Combo dang hoat dong "${conflictCombo.name}". Khong the trung lap san pham trong nhieu combo cung luc.`,
      );
    }
  }

  /**
   * Format & tinh gia goc, gia combo, va so tien tiet kiem (BR-05)
   */
  private formatComboDetails(combo: any) {
    const totalOriginalPrice = combo.items.reduce((acc: number, item: any) => {
      return acc + (item.product?.basePrice ?? 0) * item.quantity;
    }, 0);

    let calculatedComboPrice = totalOriginalPrice;
    let savingsAmount = 0;

    if (combo.discountType === 'PERCENTAGE') {
      savingsAmount = (totalOriginalPrice * combo.discountVal) / 100;
      calculatedComboPrice = totalOriginalPrice - savingsAmount;
    } else if (combo.discountType === 'FIXED_AMOUNT') {
      savingsAmount = combo.discountVal;
      calculatedComboPrice = Math.max(0, totalOriginalPrice - savingsAmount);
    } else if (combo.discountType === 'BUNDLE_PRICE' && combo.bundlePrice) {
      calculatedComboPrice = combo.bundlePrice;
      savingsAmount = Math.max(0, totalOriginalPrice - combo.bundlePrice);
    }

    return {
      id: combo.id,
      name: combo.name,
      code: combo.code,
      description: combo.description,
      discountType: combo.discountType,
      discountVal: combo.discountVal,
      bundlePrice: combo.bundlePrice,
      totalOriginalPrice,
      calculatedComboPrice,
      savingsAmount,
      startDate: combo.startDate,
      endDate: combo.endDate,
      isActive: combo.isActive,
      items: combo.items.map((i: any) => ({
        id: i.id,
        productId: i.productId,
        quantity: i.quantity,
        product: i.product,
      })),
    };
  }
}

