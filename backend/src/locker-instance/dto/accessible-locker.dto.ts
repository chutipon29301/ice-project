import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class AccessibleLockerDto {
    @ApiModelProperty({
        description: 'Locker id',
        required: true,
    })
    @IsNumber()
    @ToInt()
    lockerID: number;
}
