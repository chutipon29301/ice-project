import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerSecretDto {
    @ApiModelProperty({
        description: 'secret of a locker required',
        required: false,
    })
    @IsString()
    secret: string;
}
