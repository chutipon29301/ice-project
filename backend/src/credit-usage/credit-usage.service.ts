import { Injectable, Inject } from '@nestjs/common';
import { CreditUsageRepositoryToken } from 'src/constant';
import { Repository } from 'typeorm';
import { CreditUsage } from 'src/entities/credit-usage.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CreditUsageService {
    constructor(
        @Inject(CreditUsageRepositoryToken)
        private readonly creditUsageRepository: Repository<CreditUsage>,
        private readonly userService: UserService,
    ) { }
    public async getMyCredit(nationalID: string) {
        await this.creditUsageRepository.findOneOrFail({ where: nationalID });
        const { totalCredit } = await this.creditUsageRepository
            .createQueryBuilder('credit')
            .select('SUM(credit.nationalID)', 'sum')
            .where("credit.nationalID = :nationalID", { id: nationalID })
            .getRawOne();
        console.log({ totalCredit })
        return { totalCredit };
    }
    public async addCredit(amount: number, nationalID: string) {
        const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
        const creditUse = new CreditUsage(amount, user);
        this.creditUsageRepository.save(creditUse);
    }

}
