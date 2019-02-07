import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class EditGroupDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @ToInt()
    maxHours: number;
}
