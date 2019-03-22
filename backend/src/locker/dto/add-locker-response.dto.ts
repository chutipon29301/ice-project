import { ApiModelProperty } from '@nestjs/swagger';

export class AddLockerResponseDto {
    @ApiModelProperty({
        description: 'Locker id',
        required: true,
    })
    id: number;
    @ApiModelProperty({
        description: 'Serial number of locker',
        required: true,
    })
    serial: string;
}
