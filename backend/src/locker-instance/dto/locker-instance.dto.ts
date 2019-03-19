import { ToInt } from 'class-sanitizer';
import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerInstanceDto {
    @ApiModelProperty({
        description: 'Locker id',
        required: true,
    })
    @IsNumber()
    @ToInt()
    public lockerID: number;
}
