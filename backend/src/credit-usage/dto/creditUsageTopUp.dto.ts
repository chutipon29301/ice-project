import { ApiModelProperty } from '@nestjs/swagger';

export class CreditUsageTopUpDto {
    @ApiModelProperty({
        description: 'amount of money user wants to top up',
        required: true,
    })
    amount: number;
}
