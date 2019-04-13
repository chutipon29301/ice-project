import { Inject, Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Repository, MoreThan, FindOneOptions, ObjectLiteral } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { QRCodeRepositoryToken } from '../constant';
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
        try {
            const locker = await this.lockerService.findLocker({ key: { activeLockerSerialNumber: serialNumber } });
            const qr = new QRCode(locker);
            await this.qrCodeRepository.save(qr);
            return `${this.configService.liffServerURL}/unlock?accessCode=${qr.id}`;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async findQRCode({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            accessCode?: string;
        };
        throwError?: boolean;
        joinWith?: Array<keyof QRCode>;
        nestedJoin?: string[];
    }): Promise<QRCode> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: ObjectLiteral | FindOneOptions<QRCode> = {};
        try {
            if (key.accessCode) {
                where = { id: key.accessCode, expireDate: MoreThan(new Date()) };
            }
            if (throwError) {
                return await this.qrCodeRepository.findOneOrFail({ where, relations });
            } else {
                return await this.qrCodeRepository.findOne({ where, relations });
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
}
