import { Injectable, Inject } from '@nestjs/common';
import { CreditUsageRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { CreditUsage } from '../entities/credit-usage.entity';
import { UserService } from '../user/user.service';
import moment = require('moment');

@Injectable()
export class CreditUsageService {
    constructor(
        @Inject(CreditUsageRepositoryToken)
        private readonly creditUsageRepository: Repository<CreditUsage>,
        private readonly userService: UserService,
    ) {}
    public async getMyTotalCredit(nationalID: string) {
        await this.creditUsageRepository.findOneOrFail({ where: nationalID });
        const { totalCredit } = await this.creditUsageRepository
            .createQueryBuilder('credit')
            .select('SUM(credit.nationalID)', 'sum')
            .where('credit.nationalID = :nationalID', { id: nationalID })
            .getRawOne();
        console.log({ totalCredit });
        return { totalCredit };
    }

    public async addCredit(
        amount: number,
        nationalID: string,
    ): Promise<CreditUsage> {
        const user = await this.userService.findUserWithNationalIDOrFail(
            nationalID,
        );
        const creditUse = new CreditUsage(amount, user);
        this.creditUsageRepository.save(creditUse);
        return creditUse;
    }

    public async calculateTimeCharge(
        startTime: Date,
        endTime: Date,
        nationalID: string,
    ): Promise<CreditUsage> {
        const totalTimeUsed = endTime.getTime() - startTime.getTime();
        const chargingFee = -0.5;
        const amountCharge =
            moment(totalTimeUsed)
                .subtract(15, 'minutes')
                .minutes() * chargingFee;
        return await this.addCredit(amountCharge, nationalID);
    }
}
