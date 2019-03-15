import { Module } from '@nestjs/common';
import { LockerInstanceService } from './locker-instance.service';
import { LockerInstanceController } from './locker-instance.controller';
import { DatabaseModule } from 'src/database.module';
import { lockerInstanceProviders } from './locker-instance.providers';
import { LockerModule } from 'src/locker/locker.module';

@Module({
    imports: [DatabaseModule, LockerModule],
    providers: [...lockerInstanceProviders, LockerInstanceService],
    controllers: [LockerInstanceController],
})
export class LockerInstanceModule {}
