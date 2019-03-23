import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerLockDto {
    @ApiModelProperty({
        description: 'Locker serial number',
        required: true,
    })
    @IsString()
    serialNumber: string;
}
