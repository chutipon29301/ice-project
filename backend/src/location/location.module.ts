import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { locationProviders } from './location.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
    controllers: [LocationController],
    providers: [LocationService, ...locationProviders],
    imports: [DatabaseModule],
})
export class LocationModule {}
