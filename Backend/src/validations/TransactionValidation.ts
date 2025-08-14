import { IsNotEmpty, IsNumber, IsIn, IsString, IsDateString, IsOptional } from "class-validator";

export class CreateTransaction {
  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId!: number;
}

export class UpdateTransaction {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
