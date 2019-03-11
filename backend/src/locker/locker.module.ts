import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { lockerProviders } from './locker.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...lockerProviders, LockerService],
    controllers: [LockerController],
})
export class LockerModule {}
