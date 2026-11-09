import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * UC-02: Xem chi tiet gio hang
   */
  @Get()
  getCart(@Query('sessionId') sessionId: string) {
    const validSession = sessionId || 'guest-default-session';
    return this.cartService.getCartSummary(validSession);
  }

  /**
   * UC-01: Them san pham vao gio hang
   */
  @Post('items')
  addItem(@Body() dto: AddCartItemDto) {
    return this.cartService.addItemToCart(dto);
  }

  /**
   * UC-02: Cap nhat so luong
   */
  @Patch('items/:id')
  updateQuantity(@Param('id') id: string, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateItemQuantity(id, dto);
  }

  /**
   * UC-02: Xoa san pham khoi gio
   */
  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  /**
   * UC-02: Xoa sach gio hang
   */
  @Delete()
  clearCart(@Query('sessionId') sessionId: string) {
    const validSession = sessionId || 'guest-default-session';
    return this.cartService.clearCart(validSession);
  }
}

