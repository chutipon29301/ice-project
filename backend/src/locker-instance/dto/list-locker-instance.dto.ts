import { ToInt } from 'class-sanitizer';
import { IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ListLockerInstanceDto {
    @ApiModelProperty({
        description: 'Locker id',
        required: true,
    })
    @IsNumber()
    @ToInt()
    public lockerID: number;

    @ApiModelProperty({
        description: 'Locker start using time',
        required: true,
    })
    @IsDate()
    public startTime: Date;
}
