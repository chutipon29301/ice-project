import { ApiModelProperty } from "@nestjs/swagger";

export class JwtTokenInfo {
    @ApiModelProperty({
        description: 'name of the group that user belongs to',
        required: true,
    })
    token: string;
    @ApiModelProperty({
        description: 'Expire date of jwt token',
        required: true,
    })
    expireDate: Date;
}
