import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}

