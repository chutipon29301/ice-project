import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { LockerModule } from '../locker/locker.module';
import { QrController } from './qr.controller';
import { qrProviders } from './qr.providers';
import { QrService } from './qr.service';

@Module({
    imports: [ConfigModule, LockerModule],
    providers: [...qrProviders, QrService],
    controllers: [QrController],
})
export class QrModule { }
