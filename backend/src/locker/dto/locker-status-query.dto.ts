import { Sanitize } from 'class-sanitizer';
import { LockerAvailability } from '../../entities/locker.entity';

export class LockerStatusQueryDto {
    status: LockerAvailability[];
}
