import { IsString, IsOptional } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    name: string;
}
