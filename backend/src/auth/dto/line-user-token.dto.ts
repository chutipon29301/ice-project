import { IsString } from 'class-validator';

export class LineUserToken {
    @IsString()
    lineToken: string;
}
