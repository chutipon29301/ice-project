import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LockerInstanceService } from '../locker-instance/locker-instance.service';
import { QRCode } from '../entities/qr-code.entity';
import { Repository } from 'typeorm';
import { QRCodeRepositoryToken } from '../constant';
import { LockerService } from '../locker/locker.service';

@Injectable()
export class QrService {

    constructor(
        @Inject(QRCodeRepositoryToken)
        private readonly qrCodeRepository: Repository<QRCode>,
        private readonly configService: ConfigService,
        private readonly lockerService: LockerService,
    ) { }

    public async generateRedirectURL(serialNumber: string): Promise<string> {
        const locker = await this.lockerService.findActiveLockerBySerialNumber(serialNumber);
        const qr = new QRCode(locker);
        await this.qrCodeRepository.save(qr);
        return `${this.configService.serverURL}/unlock?accessCode=${qr.id}`;
    }

}
