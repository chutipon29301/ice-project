import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class CreateGroupDto {
    @IsString()
    name: string;
}
