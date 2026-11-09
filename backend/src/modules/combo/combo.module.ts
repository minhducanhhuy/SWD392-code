import { Module } from '@nestjs/common';
import { ComboController } from './combo.controller';
import { ComboService } from './combo.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [ComboController],
  providers: [ComboService],
  exports: [ComboService],
})
export class ComboModule {}

