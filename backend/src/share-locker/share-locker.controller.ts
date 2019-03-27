import { Controller, Post, Get, Query } from '@nestjs/common';
import { ShareLockerService } from './share-locker.service';
import { RequestInvitationDto } from './dto/request-invitation-link.dto';

@Controller('share-locker')
export class ShareLockerController {
    constructor(private readonly shareLockerService: ShareLockerService) {}
    @Get('generateLink')
    async generateInvitationLink(@Query() query: RequestInvitationDto) {
        const link = await this.shareLockerService.generateInvitationLink();
        return { link };
    }
    @Post()
    async addUserCanAccess() {}
}
