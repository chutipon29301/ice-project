import { Module } from '@nestjs/common';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { lockerProviders } from './locker.providers';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ConfigModule],
    controllers: [LockerController],
    providers: [LockerService, ...lockerProviders],
})
export class LockerModule {}
