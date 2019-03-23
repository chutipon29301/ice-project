import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerInstanceDto {
    @ApiModelProperty({
        description: 'Locker id',
        required: true,
    })
    @IsNumber()
    @ToInt()
    public lockerID: number;

    @ApiModelProperty({
        description: 'National id of user',
        required: true,
    })
    @IsString()
    public nationalID: string;
}
