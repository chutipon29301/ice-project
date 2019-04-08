import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnectionToken, QRCodeRepositoryToken } from '../constant';
import { QRCode } from '../entities/qr-code.entity';

export const qrProviders: Provider[] = [
    {
        provide: QRCodeRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(QRCode),
        inject: [DbConnectionToken],
    },
];
