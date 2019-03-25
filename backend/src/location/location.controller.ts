import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    ParseIntPipe,
    Body,
    Patch,
} from '@nestjs/common';
import { Location } from '../entities/location.entity';
import { LocationService } from './location.service';
import { LocationEntityDto } from './dto/location-entity.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    async list(): Promise<{ locations: Location[] }> {
        const locations = await this.locationService.list();
        return { locations };
    }

    @Post()
    async create(@Body() body: LocationEntityDto) {
        await this.locationService.create(body.description, body.lat, body.lng);
    }

    @Patch('/:id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: LocationEntityDto,
    ) {
        await this.locationService.update(id, body);
    }

    @Delete('/:id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.locationService.delete(id);
    }
}
