import { Controller, Get, Post, Body } from '@nestjs/common';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { CreditUsageService } from './credit-usage.service';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { User } from '../decorator/user.decorator';
import { CreditUsageTopUpDto } from './dto/creditUsageTopUp.dto';
import { CreditSummary } from './dto/credit-summary.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('Credit Usage')
@Controller('credit-usage')
export class CreditUsageController {

    constructor(private readonly creditUsageService: CreditUsageService) {}

    @ApiBearerAuth()
    @Get('myCredit')
    @Roles(Role.USER, Role.SUPERUSER)
    async getMyCredit(@User() user: JwtToken): Promise<CreditSummary> {
        return await this.creditUsageService.currentCredit(user.nationalID);
    }

    @ApiBearerAuth()
    @Post('addCredit')
    @Roles(Role.ADMIN, Role.SUPERUSER)
    async addCredit(@Body() body: CreditUsageTopUpDto) {
        const myAddedCredit = await this.creditUsageService.addCredit(body.amount, body.userID);
        return {
            totalCredit: myAddedCredit.amount,
        };
    }

}
