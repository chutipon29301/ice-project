import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AuthenticationType } from '../../entities/user.entity';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAdminEntityDto {
    @ApiModelProperty({
        description: 'National id of admin',
        required: true,
    })
    @IsNumber()
    @ToInt()
    nationalID: string;

    @ApiModelProperty({
        description: 'First name of admin',
        required: true,
    })
    @IsString()
    firstName: string;

    @ApiModelProperty({
        description: 'Last name of admin',
        required: true,
    })
    @IsString()
    lastName: string;

    @ApiModelProperty({
        description: 'Authentication id of admin',
        required: true,
    })
    @IsString()
    authenticationID: string;

    @ApiModelProperty({
        description: 'Authentication type of admin',
        required: true,
    })
    @IsEnum(AuthenticationType)
    authenticationType: AuthenticationType;

    @ApiModelProperty({
        description: 'Phone number of admin',
        required: true,
    })
    @IsString()
    phone: string;
}
