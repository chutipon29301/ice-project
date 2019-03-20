import { ApiModelProperty } from '@nestjs/swagger';

export class JwtToken {
    @ApiModelProperty({
        description: 'User id of jwt token',
        required: true,
    })
    nationalID: string;
}
