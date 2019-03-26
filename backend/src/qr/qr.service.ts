import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { QRCodeRepositoryToken } from '../constant';
import { Locker } from '../entities/locker.entity';
import { QRCode } from '../entities/qr-code.entity';
import { LockerService } from '../locker/locker.service';

@Injectable()
export class QrService {
    constructor(
        @Inject(QRCodeRepositoryToken)
        private readonly qrCodeRepository: Repository<QRCode>,
        private readonly configService: ConfigService,
        private readonly lockerService: LockerService,
    ) {}

    public async generateRedirectURL(serialNumber: string): Promise<string> {
        const locker = await this.lockerService.findActiveLockerBySerialNumber(
            serialNumber,
        );
        const qr = new QRCode(locker);
        await this.qrCodeRepository.save(qr);
        return `${this.configService.liffServerURL}/unlock?accessCode=${qr.id}`;
    }

    public async findLockerByAccessCode(id: string): Promise<Locker> {
        const qrCode = await this.qrCodeRepository.findOne({
            where: { id },
            relations: ['locker'],
        });
        return qrCode.locker;
    }
}
