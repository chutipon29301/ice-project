import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserEntityDto {
    @ApiModelProperty({
        description: 'National id of user',
        required: true,
    })
    @IsString()
    nationalID: string;

    @ApiModelProperty({
        description: 'First name of user',
        required: true,
    })
    @IsString()
    firstName: string;

    @ApiModelProperty({
        description: 'Last name of user',
        required: true,
    })
    @IsString()
    lastName: string;

    @ApiModelProperty({
        description: 'Authentication id got from /auth/lineToken',
        required: true,
    })
    @IsString()
    authenticationID: string;

    @ApiModelProperty({
        description: 'User phone number',
        required: true,
    })
    @IsString()
    phone: string;
}
