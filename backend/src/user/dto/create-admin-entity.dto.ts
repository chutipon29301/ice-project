import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AuthenticationType } from '../../entities/user.entity';

export class CreateAdminEntityDto {
    @IsString()
    nationalID: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    authenticationID: string;

    @IsEnum(AuthenticationType)
    authenticationType: AuthenticationType;

    @IsString()
    phone: string;
}
