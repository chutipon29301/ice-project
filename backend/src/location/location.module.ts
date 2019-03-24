import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { LocationController } from './location.controller';
import { locationProviders } from './location.providers';
import { LocationService } from './location.service';

@Module({
    imports: [DatabaseModule],
    providers: [...locationProviders, LocationService],
    controllers: [LocationController],
    exports: [LocationService],
})
export class LocationModule {}
