import { IsString } from 'class-validator';

export class RequestTokenDto {
    @IsString()
    code: string;
}
