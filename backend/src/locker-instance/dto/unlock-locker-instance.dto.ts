import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UnlockLockerInstanceDto {
    @ApiModelProperty({
        description: 'Locker access code',
        required: true,
    })
    @IsString()
    public accessCode: string;
}
