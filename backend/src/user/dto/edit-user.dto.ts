import { IsString, IsOptional } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}
