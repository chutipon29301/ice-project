import { Module } from '@nestjs/common';
import { CreditUsageService } from './credit-usage.service';
import { CreditUsageController } from './credit-usage.controller';

@Module({
    providers: [CreditUsageService],
    controllers: [CreditUsageController],
})
export class CreditUsageModule {}
