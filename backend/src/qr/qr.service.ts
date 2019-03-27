import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, MoreThan, LessThan } from 'typeorm';
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
    ) { }

    public async generateRedirectURL(serialNumber: string): Promise<string> {
        const locker = await this.lockerService.findActiveLockerBySerialNumber(
            serialNumber,
        );
        if (locker) {
            const qr = new QRCode(locker);
            await this.qrCodeRepository.save(qr);
            return `${this.configService.liffServerURL}/unlock?accessCode=${qr.id}`;
        } else {
            throw new NotFoundException(`Cannot generate link: Locker with serial number ${serialNumber} not found`);
        }
    }

    public async findLockerByAccessCode(id: string): Promise<Locker> {
        const qrCode = await this.qrCodeRepository.findOne({
            where: { id, expireDate: MoreThan(new Date()) },
            relations: ['locker'],
        });
        if (qrCode) {
            return qrCode.locker;
        } else {
            throw new NotFoundException('Cannot find qr code');
        }
    }
}
