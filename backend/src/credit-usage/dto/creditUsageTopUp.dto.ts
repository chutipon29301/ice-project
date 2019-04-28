import { ApiModelProperty } from '@nestjs/swagger';
import { ToInt } from 'class-sanitizer';
import { IsNumber, IsString } from 'class-validator';

export class CreditUsageTopUpDto {
    @ApiModelProperty({
        description: 'amount of money user wants to top up',
        required: true,
    })
    @IsNumber()
    @ToInt()
    amount: number;

    @ApiModelProperty({
        description: 'amount of money user wants to top up',
        required: true,
    })
    @IsString()
    userID: string;
}
