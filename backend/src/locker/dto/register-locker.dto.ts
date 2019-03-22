import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterLockerDto {
    @ApiModelProperty({
        description: 'Edit locker name',
        required: false,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'Changed locker location id',
        required: false,
    })
    @IsNumber()
    @ToInt()
    public locationID: number;

    @ApiModelProperty({
        description: 'Edit Locker number',
        required: false,
    })
    @IsString()
    public number: string;

    // @IsOptional()
    // @IsEnum(LockerStatus)
    // public status: LockerStatus;
}
