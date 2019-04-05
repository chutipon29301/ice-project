import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAdminEntityDto {
    @ApiModelProperty({
        description: 'National id of admin',
        required: true,
    })
    @IsString()
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
        description: 'Phone number of admin',
        required: true,
    })
    @IsString()
    phone: string;
}
