import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';

export class EditGroupDto {
    @IsString()
    name: string;

    @IsNumber()
    @ToInt()
    maxHours: number;
}
