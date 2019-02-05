import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { LockerStatus } from 'src/models/Locker.model';
import { DataType } from 'sequelize-typescript';

export class EditLockerDto {
    @IsString()
    name: string;

    @IsNumber()
    @ToInt()
    locationID: number;

    @IsString()
    number: string;

    status: LockerStatus;
}
