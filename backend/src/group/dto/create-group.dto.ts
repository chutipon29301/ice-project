import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGroupDto {
    @ApiModelProperty({
        description: 'name of the group that user or locker belongs to',
        required: true,
    })
    @IsString()
    name: string;
}
