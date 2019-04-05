import { ApiModelProperty } from '@nestjs/swagger';

export class creditUsageTopUpDto {
    @ApiModelProperty({
        description: 'amount of money user wants to top up',
        required: true,
    })
    amount: number;
}
