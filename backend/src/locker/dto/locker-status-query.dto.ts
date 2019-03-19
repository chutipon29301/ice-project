import { Sanitize } from 'class-sanitizer';
import { LockerAvailability } from '../../entities/locker.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerStatusQueryDto {
    @ApiModelProperty({
        description: 'Locker availability status',
        required: true,
    })
    status: LockerAvailability[];
}
