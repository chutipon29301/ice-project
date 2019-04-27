import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiModelProperty({
        description: 'Report message',
        required: true,
    })
    @IsString()
    message: string;

    @ApiModelProperty({
        description: 'lockerID of the reported locker',
        required: true,
    })
    @IsNumber()
    @ToInt()
    lockerID: number;

}