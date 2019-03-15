import { ToInt } from 'class-sanitizer';
import { IsNumber } from 'class-validator';

export class LockerInstanceDto {
    @IsNumber()
    @ToInt()
    public lockerID: number;
}
