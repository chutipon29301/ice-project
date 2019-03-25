import { Controller, Get, Query } from '@nestjs/common';
import { GeneratedQRResponseDto } from './dto/generated-qr-response.dto';
import { QrService } from './qr.service';
import { ConfigService } from '../config/config.service';

@Controller('qr')
export class QrController {

    constructor(private readonly qrService: QrService,
    ) { }

    @Get('generateLink')
    async generateQRCodeLink(
        @Query('serialNumber') serialNumber: string,
    ): Promise<GeneratedQRResponseDto> {
        const link = await this.qrService.generateRedirectURL(serialNumber);
        return { link };
    }

}

// http://www.lockerswarm.com/frontend/XXXXXXXx?accessCode=ABCDE
