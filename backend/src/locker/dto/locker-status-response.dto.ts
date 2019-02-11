import { CurrentStatus } from '../../models/locker-stat.model';

export class LockerStatusResponseDto {
    public id: number;
    public name: string;
    public number: string;
    public lockerStatus: CurrentStatus;
}
