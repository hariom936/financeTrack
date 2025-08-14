import { IsNotEmpty, IsString, MinLength } from "class-validator";
import validationConstants from "../constant/validationConstants";

export class CreateRole {
  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsString({ message: validationConstants.IS_STRING_TYPE })
  @MinLength(3)
  name: string;
}

export class UpdateRole {
  @IsNotEmpty()
  @IsString()
  name: string;
}
