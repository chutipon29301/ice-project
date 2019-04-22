import { ApiModelProperty } from '@nestjs/swagger';

export class LockerGroupDto {
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
