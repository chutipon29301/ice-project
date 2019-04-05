import { Module } from '@nestjs/common';
import { CreditUsageService } from './credit-usage.service';
import { CreditUsageController } from './credit-usage.controller';
import { creditUsageProviders } from './credit-usage.provider';

@Module({
    providers: [
        CreditUsageService,
        ...creditUsageProviders,
    ],
    controllers: [CreditUsageController],
})
export class CreditUsageModule {}
