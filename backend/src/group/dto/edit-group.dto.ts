import { ToInt } from 'class-sanitizer';
import { IsString, IsOptional } from 'class-validator';

export class EditGroupDto {
    @IsOptional()
    @IsString()
    name: string;
}
