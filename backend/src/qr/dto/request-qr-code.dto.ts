import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RequestQrCodeDto {
    @ApiModelProperty({
        description: 'Serial number of locker',
        required: true,
    })
    @IsString()
    serialNumber: string;
}
