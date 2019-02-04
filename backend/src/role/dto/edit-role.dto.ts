import { IsString, IsOptional, IsNumber } from 'class-validator';

export class EditRoleDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    maxHours: number;
}
