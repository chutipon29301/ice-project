import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { DatabaseModule } from 'src/database.module';
import { locationProviders } from './location.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...locationProviders, LocationService],
    controllers: [LocationController],
    exports: [LocationService],
})
export class LocationModule {}
