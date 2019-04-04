import { Module } from '@nestjs/common';
import { LockerModule } from '../locker/locker.module';
import { QrController } from './qr.controller';
import { qrProviders } from './qr.providers';
import { QrService } from './qr.service';

@Module({
    imports: [LockerModule],
    providers: [...qrProviders, QrService],
    controllers: [QrController],
    exports: [QrService],
})
export class QrModule {}
