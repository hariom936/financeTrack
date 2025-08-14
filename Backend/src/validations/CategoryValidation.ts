import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import validationConstants from "../constant/validationConstants";

export class CreateCategory {
  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsString()
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

export class UpdateCategory {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
