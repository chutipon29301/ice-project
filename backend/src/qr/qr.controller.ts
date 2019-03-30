import { Controller, Post, Query, Get } from '@nestjs/common';
import { GeneratedQRResponseDto } from './dto/generated-qr-response.dto';
import { RequestQrCodeDto } from './dto/request-qr-code.dto';
import { QrService } from './qr.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('QR')
@Controller('qr')
export class QrController {
    constructor(private readonly qrService: QrService) {}

    @Get('generateLink')
    async generateQRCodeLink(
        @Query() query: RequestQrCodeDto,
    ): Promise<GeneratedQRResponseDto> {
        const link = await this.qrService.generateRedirectURL(
            query.serialNumber,
        );
        return { link };
    }
}
