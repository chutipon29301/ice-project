import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateLocationDto {
    @ApiModelProperty({
        description: 'name of the location that the locker is installed',
        required: true,
    })
    @IsString()
    name: string;

    @ApiModelProperty({
        description: 'detail of the location where the locker is',
        required: true,
    })
    @IsString()
    detail: string;
}
