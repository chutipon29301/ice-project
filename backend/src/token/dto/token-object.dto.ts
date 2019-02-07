import { ApiModelProperty } from '@nestjs/swagger';

export class TokenObject {
    @ApiModelProperty({
        description: 'generated token for permission user',
        required: true,
    })
    token: string;

    @ApiModelProperty({
        description: 'expire date for generated token',
        required: true,
    })
    expireDate: Date;
}
