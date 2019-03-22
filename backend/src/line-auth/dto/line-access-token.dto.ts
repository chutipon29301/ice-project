import { ApiModelProperty } from '@nestjs/swagger';

export class LineAccessToken {
    @ApiModelProperty({
        description: 'Token id received from line',
        required: true,
    })
    idToken: string;
    @ApiModelProperty({
        description: 'Line token expire date',
        required: true,
    })
    expireIn: number;
}
