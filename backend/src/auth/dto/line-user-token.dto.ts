import { IsString } from 'class-validator';

export class LineUserTokenDto {
    @IsString()
    lineToken: string;
}
