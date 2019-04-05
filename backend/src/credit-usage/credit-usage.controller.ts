import { Controller, Get, Post, Body } from '@nestjs/common';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { CreditUsageService } from './credit-usage.service';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { User } from '../decorator/user.decorator';
import { creditUsageTopUpDto } from './dto/creditUsageTopUp.dto';

@Controller('credit-usage')
export class CreditUsageController {
    constructor(private readonly creditUsageService: CreditUsageService){}
    @Get('myCredit')
    @Roles(Role.USER)
    async getMyCredit(@User() user:JwtToken){
        const myCredit = await this.creditUsageService.getMyTotalCredit(user.nationalID);
        return {
            totalCredit: myCredit.totalCredit,
        }
    }

    @Post('addCredit')
    @Roles(Role.USER,Role.ADMIN)
    async addCredit(@User() user:JwtToken,@Body() body: creditUsageTopUpDto){
        const myAddedCredit = await this.creditUsageService.addCredit(body.amount,user.nationalID);
        return {
            totalCredit: myAddedCredit.amount,
        }
    }

}
