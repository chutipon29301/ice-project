import { IsString } from 'class-validator';

export class CreateUserEntityDto {
    @IsString()
    nationalID: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    authenticationID: string;

    @IsString()
    phone: string;
}
