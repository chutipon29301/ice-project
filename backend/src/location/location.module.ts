import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { locationProviders } from './location.providers';

@Module({
    controllers: [LocationController],
    providers: [LocationService, ...locationProviders],
})
export class LocationModule {}
