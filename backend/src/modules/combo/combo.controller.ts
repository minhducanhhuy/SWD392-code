import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { AddComboToCartDto } from './dto/add-combo-to-cart.dto';

@Controller('combos')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  /**
   * UC-03: Xem danh sach Combo dang ap dung tren Storefront
   */
  @Get()
  getActiveCombos() {
    return this.comboService.getActiveCombos();
  }

  /**
   * UC-03: Xem chi tiet 1 Combo
   */
  @Get(':id')
  getComboById(@Param('id') id: string) {
    return this.comboService.getComboById(id);
  }

  /**
   * UC-04: Them Combo vao gio hang
   */
  @Post('add-to-cart')
  addComboToCart(@Body() dto: AddComboToCartDto) {
    return this.comboService.addComboToCart(dto);
  }

  // ==========================================
  // UC-06: QUAN LY COMBO (ADMIN / STAFF)
  // ==========================================

  /**
   * UC-06: Lay toan bo danh sach Combo quan tri
   */
  @Get('admin/all')
  getAllCombosForAdmin() {
    return this.comboService.getAllCombosForAdmin();
  }

  /**
   * UC-06: Tao moi Combo
   */
  @Post('admin')
  createCombo(@Body() dto: CreateComboDto) {
    return this.comboService.createCombo(dto);
  }

  /**
   * UC-06: Cap nhat thong tin Combo
   */
  @Put('admin/:id')
  updateCombo(@Param('id') id: string, @Body() dto: UpdateComboDto) {
    return this.comboService.updateCombo(id, dto);
  }

  /**
   * UC-06: Bat/Tat trang thai Combo
   */
  @Patch('admin/:id/toggle-status')
  toggleStatus(@Param('id') id: string) {
    return this.comboService.toggleComboStatus(id);
  }

  /**
   * UC-06: Xoa Combo
   */
  @Delete('admin/:id')
  deleteCombo(@Param('id') id: string) {
    return this.comboService.deleteCombo(id);
  }
}

