import { Module, forwardRef } from '@nestjs/common';
import { LocationController } from './location.controller';
import { locationProviders } from './location.providers';
import { LocationService } from './location.service';
import { LockerModule } from '../locker/locker.module';

@Module({
    imports: [forwardRef(() => LockerModule)],
    providers: [...locationProviders, LocationService],
    controllers: [LocationController],
    exports: [LocationService],
})
export class LocationModule { }
