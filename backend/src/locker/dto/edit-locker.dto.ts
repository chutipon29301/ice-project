import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditLockerDto {
    @ApiModelProperty({
        description: 'Edit locker name',
        required: false,
    })
    @IsOptional()
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'Changed locker location id',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @ToInt()
    public locationID: number;

    @ApiModelProperty({
        description: 'Edit Locker number',
        required: false,
    })
    @IsOptional()
    @IsString()
    public number: string;

    // @IsOptional()
    // @IsEnum(LockerStatus)
    // public status: LockerStatus;
}
