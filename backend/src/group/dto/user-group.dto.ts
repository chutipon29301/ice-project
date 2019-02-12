import { IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserGroupDto {
    @ApiModelProperty({
        description: 'UserID',
        required: true,
    })
    @IsNumber()
    @ToInt()
    userID: number;

    @ApiModelProperty({
        description: 'GroupID',
        required: true,
    })
    @IsNumber()
    @ToInt()
    groupID: number;
}
