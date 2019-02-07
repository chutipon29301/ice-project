import { ApiModelProperty } from '@nestjs/swagger';

export class Token {
    @ApiModelProperty({
        description: 'userID of registered user',
        required: true,
    })
    userID: number;
}
