import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  variantId: string;

  @IsInt()
  @Min(1)
  @Max(10, { message: 'BR-09: Khong the them qua 10 don vi cho cung mot bien the vao gio hang' })
  quantity: number;

  @IsString()
  @IsOptional()
  comboId?: string;

  @IsString()
  @IsOptional()
  comboGroupId?: string;
}

