import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LineUserTokenDto {
    @ApiModelProperty({
        description: 'Line token of user',
        required: true,
    })
    @IsString()
    lineToken: string;
}
