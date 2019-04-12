import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LockerInstanceDto {
    @ApiModelProperty({
        description: 'Access Code to locker',
        required: true,
    })
    @IsString()
    public accessCode: string;
}
