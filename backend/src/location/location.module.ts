import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { locationProviders } from './location.providers';
import { LocationService } from './location.service';

@Module({
    providers: [...locationProviders, LocationService],
    controllers: [LocationController],
    exports: [LocationService],
})
export class LocationModule {}
