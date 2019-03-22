import { ApiModelProperty } from '@nestjs/swagger';

export class RequestTokenDto {
    @ApiModelProperty({
        description: 'Token code received from line',
        required: true,
    })
    code: string;
}
