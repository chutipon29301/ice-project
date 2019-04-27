import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class EditReportDto {
    @IsOptional()
    @IsString() 
    message: string;

    @IsOptional()
    @IsNumber()
    @ToInt()
    lockerID: number;
}