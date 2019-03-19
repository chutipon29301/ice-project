import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class LocationEntityDto {
    @ApiModelProperty({
        description: 'Description of locker location',
        required: true,
    })
    @IsString()
    description: string;

    @ApiModelProperty({
        description: 'Latitude of location',
        required: true,
    })
    @IsNumber()
    @ToInt()
    lat: number;

    @ApiModelProperty({
        description: 'Longitude of location',
        required: true,
    })
    @IsNumber()
    @ToInt()
    lng: number;
}
