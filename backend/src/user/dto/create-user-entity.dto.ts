import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class CreateUserEntityDto {
    @IsNumber()
    @ToInt()
    nationalID: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    authenticationID: string;

    @IsString()
    phone: string;
}
