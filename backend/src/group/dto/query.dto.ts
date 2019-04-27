import { IsString, IsOptional } from 'class-validator';

export class QueryDto {
    @IsOptional()
    @IsString()
    groupName: string;
}