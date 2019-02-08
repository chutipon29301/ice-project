import { LockerStatus } from '../../models/locker.model';
import { IsLockerStatus } from '../../decorator/is-locker-status.decorator';
import { Sanitize } from 'class-sanitizer';
import { ToArraySanitizer } from '../../sanitizer/to-array.sanitizer';

export class LockerStatusQueryDto {
    @IsLockerStatus()
    @Sanitize(ToArraySanitizer)
    status: LockerStatus[];
}
