import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LockerAvailability } from '../../entities/locker.entity';

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

    @ApiModelProperty({
        description: 'Edit Locker availability',
        required: false,
    })
    @IsOptional()
    @IsEnum(LockerAvailability)
    public lockerAvailability: LockerAvailability;
}
