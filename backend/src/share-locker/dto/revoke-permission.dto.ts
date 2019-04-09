import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';

export class RevokePermissionDto{
    @IsNumber()
    @ToInt()
    lockerID: number;

    @IsString()
    nationalID: string;
}