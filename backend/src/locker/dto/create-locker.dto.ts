import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
export class CreateLockerDto {
    @IsString()
    name: string;

    @IsNumber()
    @ToInt()
    locationID: number;

    @IsString()
    number: string;
}
