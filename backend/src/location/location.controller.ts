import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import Location from '../models/Location.model';
import { CreateLocationDto } from './dto/create-location.dto';
import { EditLocationDto } from './dto/edit-location.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    async listAllLocation(): Promise<Location[]> {
        return await this.locationService.listAll();
    }

    @Post()
    registerLocation(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(
            createLocationDto.name,
            createLocationDto.detail
            );
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editLocationDto: EditLocationDto) {
        await this.locationService.edit(parseInt(id, 10), editLocationDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.locationService.delete(parseInt(id, 10));
    }
}
