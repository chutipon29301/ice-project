import { IsString } from 'class-validator';

export class EditLocationDto {
    @IsString()
    name: string;

    @IsString()
    detail: string;
}
