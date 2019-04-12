import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AccessLockerInstanceDto {
    @ApiModelProperty({
        description: 'Locker access code',
        required: true,
    })
    @IsString()
    public accessCode: string;
}
