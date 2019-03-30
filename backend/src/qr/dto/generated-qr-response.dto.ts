import { ApiModelProperty } from "@nestjs/swagger";

export class GeneratedQRResponseDto {
    @ApiModelProperty({
        description: 'qr code link',
        required: true,
    })
    link: string;
}
