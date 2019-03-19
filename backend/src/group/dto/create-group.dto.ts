import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGroupDto {
    @ApiModelProperty({
        description: 'name of the group that user or locker belongs to',
        required: true,
    })
    @IsString()
    name: string;
}
