import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class LocationEntityDto {
    @IsString()
    description: string;

    @IsNumber()
    @ToInt()
    lat: number;

    @IsNumber()
    @ToInt()
    lng: number;
}
