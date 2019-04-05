import { Controller, Get } from '@nestjs/common';
import { Role } from 'src/entities/user.entity';
import { Roles } from 'src/guard/role.decorator';
import { async } from 'rxjs/internal/scheduler/async';
import { CreditUsageService } from './credit-usage.service';
import { JwtToken } from 'src/jwt-auth/dto/jwt-token.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('credit-usage')
export class CreditUsageController {
    constructor(private readonly creditUsageService: CreditUsageService){}
    @Get('myCredit')
    @Roles(Role.USER)
    async getMyCredit(@User() user:JwtToken){
        const myCredit = await this.creditUsageService.getMyCredit(user.nationalID);
        return {
            totalCredit: myCredit.totalCredit,
        }
    }

}
