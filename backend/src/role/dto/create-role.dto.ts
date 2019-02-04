import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
export class CreateRoleDto {
    @IsString()
    name: string;

    @IsNumber()
    @ToInt()
    maxHours: number;
}
