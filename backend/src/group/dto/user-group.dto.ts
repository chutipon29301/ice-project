import { IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class UserGroupDto {
    @IsNumber()
    @ToInt()
    userID: number;

    @IsNumber()
    @ToInt()
    groupID: number;
}
