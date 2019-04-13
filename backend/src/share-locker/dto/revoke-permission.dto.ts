import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RevokePermissionDto {
    @ApiModelProperty({
        description: 'locker ID that user wants to revoke some of shared permission of',
        required: true,
    })
    @IsNumber()
    @ToInt()
    lockerID: number;

    @ApiModelProperty({
        description: 'amount of money user wants to top up',
        required: true,
    })
    @IsString()
    nationalID: string;
}
