import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class lockerGroupDto {
    @ApiModelProperty({
        description: 'Locker added to the group',
        required: true,
    })
    lockerID: number;

    @ApiModelProperty({
        description: 'Group locker belongs to',
        required: true,
    })
    groupID: number;
}
