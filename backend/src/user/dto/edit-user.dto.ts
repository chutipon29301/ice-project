import { IsString, IsOptional, IsInt } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsInt()
    public roleID: number;

    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public oAuthID: string;
}
