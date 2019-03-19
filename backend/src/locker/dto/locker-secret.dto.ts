import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerSecretDto {
    @ApiModelProperty({
        description: 'Locker secret',
        required: true,
    })
    @IsString()
    secret: string;
}
