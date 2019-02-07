import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditLocationDto {
    @ApiModelProperty({
        description: 'name of the location that the locker is installed',
        required: false,
    })
    @IsString()
    name: string;

    @ApiModelProperty({
        description: 'detail of the location where the locker is',
        required: false,
    })
    @IsString()
    detail: string;
}
