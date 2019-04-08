import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class userGroupDto {
    @ApiModelProperty({
        description: 'User added to the group',
        required: true,
    })
    @IsString()
    nationalID: string;

    @ApiModelProperty({
        description: 'Group user belongs to',
        required: true,
    })
    groupID: number;
}
