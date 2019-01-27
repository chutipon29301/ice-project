import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import Location from '../models/Location.model';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    findAll(): { locations: Location[] } {
        return { locations: this.locationService.findAll };
    }

    @Post()
    addLocation(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.addLocation(createLocationDto.name);
    }
}
