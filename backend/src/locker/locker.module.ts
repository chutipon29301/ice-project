import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { lockerProviders } from './locker.providers';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [DatabaseModule, ConfigModule],
    providers: [...lockerProviders, LockerService],
    controllers: [LockerController],
    exports: [LockerService],
})
export class LockerModule {}