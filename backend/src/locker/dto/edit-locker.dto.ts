import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class EditLockerDto {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsNumber()
    @ToInt()
    public locationID: number;

    @IsOptional()
    @IsString()
    public number: string;

    // @IsOptional()
    // @IsEnum(LockerStatus)
    // public status: LockerStatus;
}
