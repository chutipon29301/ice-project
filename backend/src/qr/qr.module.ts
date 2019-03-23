import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { LockerModule } from '../locker/locker.module';

@Module({
    imports: [LockerModule],
    providers: [QrService],
    controllers: [QrController],
})
export class QrModule {}
