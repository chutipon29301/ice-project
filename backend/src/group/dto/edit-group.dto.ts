import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditGroupDto {
    @ApiModelProperty({
        description: 'To fill new name of the group that user belongs to',
        required: true,
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiModelProperty({
        description: 'To edit the amount of time that a member in this group can access to a locker',
        required: true,
    })
    @IsOptional()
    @IsNumber()
    @ToInt()
    maxHours: number;
}
