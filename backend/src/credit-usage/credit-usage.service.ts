import { Injectable, Inject } from '@nestjs/common';
import { CreditUsageRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { CreditUsage } from '../entities/credit-usage.entity';
import { UserService } from '../user/user.service';
import moment = require('moment');
import { CreditSummary } from './dto/total-credit.dto';

@Injectable()
export class CreditUsageService {
    constructor(
        @Inject(CreditUsageRepositoryToken)
        private readonly creditUsageRepository: Repository<CreditUsage>,
        private readonly userService: UserService,
    ) {}

    public async currentCredit(nationalID: string): Promise<CreditSummary> {
        const credit: CreditSummary = await this.creditUsageRepository
            .createQueryBuilder('credit_usage')
            .select('SUM(credit_usage.amount)', 'totalCredit')
            .where('credit_usage.nationalID = :nationalID', { nationalID })
            .getRawOne();
        return credit;
    }

    public async addCredit(amount: number, nationalID: string): Promise<CreditUsage> {
        const user = await this.userService.findUser({ key: { nationalID } });
        const creditUse = new CreditUsage(amount, user);
        this.creditUsageRepository.save(creditUse);
        return creditUse;
    }

    public async deductCreditByTime(startTime: Date, endTime: Date, nationalID: string): Promise<CreditUsage> {
        const totalTimeUsed = endTime.getTime() - startTime.getTime();
        const chargingFee = -0.5;
        const amountCharge = Math.round(
            moment(totalTimeUsed)
                .subtract(15, 'minutes')
                .minutes() * chargingFee,
        );
        return await this.addCredit(amountCharge, nationalID);
    }
}
