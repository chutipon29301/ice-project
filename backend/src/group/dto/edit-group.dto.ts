import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditGroupDto {
    @ApiModelProperty({
        description: 'New name of the group that user or locker belongs to',
        required: false,
    })
    @IsOptional()
    @IsString()
    name: string;
}
