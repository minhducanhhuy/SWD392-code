import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './modules/cart/cart.module';
import { ComboModule } from './modules/combo/combo.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CartModule,
    ComboModule,
    ProductModule,
  ],
})
export class AppModule {}

