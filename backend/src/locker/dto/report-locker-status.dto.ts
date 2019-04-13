import { IsString, IsBoolean } from 'class-validator';
import { ToBoolean } from 'class-sanitizer';

export class ReportLockerStatusDto {

    @IsString()
    serialNumber: string;

    @IsBoolean()
    @ToBoolean()
    isLocked: boolean;
}
