import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditReportDto {
    @ApiModelProperty({
        description: 'Report message'
    })
    @IsOptional()
    @IsString()
    message: string;

    @ApiModelProperty({
        description: 'lockerID of the reported locker'
    })
    @IsOptional()
    @IsNumber()
    @ToInt()
    lockerID: number;

    @ApiModelProperty({
        description: 'resolve value of the reported locker'
    })
    @IsOptional()
    @IsBoolean()
    resolved: boolean;
}