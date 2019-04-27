import { IsString, IsNumber } from 'class-validator';
import { ToFloat } from 'class-sanitizer';
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
    @ToFloat()
    lat: number;

    @ApiModelProperty({
        description: 'Longitude of location',
        required: true,
    })
    @IsNumber()
    @ToFloat()
    lng: number;

    @ApiModelProperty({
        description: 'location image url',
        required: false,
    })
    @IsString()
    imageURL: string;
}
