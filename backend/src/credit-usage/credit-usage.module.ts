import { Module } from '@nestjs/common';
import { CreditUsageService } from './credit-usage.service';
import { CreditUsageController } from './credit-usage.controller';
import { creditUsageProviders } from './credit-usage.provider';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    providers: [
        CreditUsageService,
        ...creditUsageProviders,
    ],
    controllers: [CreditUsageController],
})
export class CreditUsageModule { }
