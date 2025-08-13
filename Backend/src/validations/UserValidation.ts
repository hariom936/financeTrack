import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    MaxLength,
    IsNumber,
    Min,
    IsString,
    IsIn,
    IsDateString,
    MinLength,
} from "class-validator";
import validationConstants from "../constant/validationConstants";

export class CreateUser {
    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    first_name: string;

    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    last_name: string;

    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @IsEmail({}, { message: validationConstants.INVALID_EMAIL })
    email: string;

    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @IsNumber()
    phone: number;

    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsOptional()
    @IsIn(['admin', 'user', 'read-only'])
    role?: 'admin' | 'user' | 'read-only';

    constructor() {
        // Provide a default value for role if it's not set
        if (!this.role) {
            this.role = 'user'; // Default role, or choose based on your requirements
        }
    }
}

export class LoginUser {
    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @IsEmail({}, { message: validationConstants.INVALID_EMAIL })
    email: string;

    @IsNotEmpty({ message: validationConstants.REQUIRED })
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    password: string; // Changed to string for security
}

export class UserListing {
    @IsOptional()
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    filterBy: string;

    @IsOptional()
    @MaxLength(100, { message: validationConstants.MAX_LENGTH })
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    filterValue: string;

    @IsOptional()
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    filterCondition: string;

    @IsOptional()
    @IsIn(['ASC', 'DESC'], { message: 'Sort type must be "ASC" or "DESC"' })
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    sortType: string; // Changed to string

    @IsOptional()
    @IsString({ message: validationConstants.IS_STRING_TYPE })
    sortBy: string;

    @IsOptional()
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: "Page is Required" })
    @IsNumber()
    @Min(1, { message: 'Page must be a positive number' })
    page: number;
}
export class UserId{
    @IsNotEmpty({ message: "User ID is required" })
    @IsNumber({}, { message: "User ID must be a number" })
    userId: number;
}

export class UpdateUser {
    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    first_name?: string;

    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    last_name?: string;

    @IsOptional()
    @IsEmail({}, { message: validationConstants.INVALID_EMAIL })
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password?: string;

    @IsOptional()
    @IsIn(['admin', 'user', 'read-only'])
    role?: 'admin' | 'user' | 'read-only';
}