import { ApiModelProperty } from '@nestjs/swagger';

// tslint:disable:variable-name
export class LineAccessTokenRequestResponse {
    @ApiModelProperty({
        description: 'Line token expire date',
        required: true,
    })
    expires_in: number;
    @ApiModelProperty({
        description: 'Id of line token',
        required: true,
    })
    id_token: string;
}
