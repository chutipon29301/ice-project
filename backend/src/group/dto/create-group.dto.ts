import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGroupDto {
    @ApiModelProperty({
        description: 'name of the group that user belongs to',
        required: true,
    })
    @IsString()
    name: string;

    @ApiModelProperty({
        description: 'The amount of time that a member in this group can access to a locker',
        required: true,
    })
    @IsNumber()
    @ToInt()
    maxHours: number;
}
