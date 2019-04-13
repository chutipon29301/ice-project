import { IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ToFloat } from 'class-sanitizer';

export class LocationCoordinationDto {
    @ApiModelProperty({
        description: 'latitude of location',
        required: true,
    })
    @IsOptional()
    @IsNumber()
    @ToFloat()
    lat: number;

    @ApiModelProperty({
        description: 'longitude of location',
        required: true,
    })
    @IsOptional()
    @IsNumber()
    @ToFloat()
    lng: number;
}
