import { IsInt, Max, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt()
  @Min(1, { message: 'So luong toi thieu phai la 1' })
  @Max(10, { message: 'BR-09: Khong the vuot qua 10 don vi cho cung mot bien the trong gio hang' })
  quantity: number;
}

