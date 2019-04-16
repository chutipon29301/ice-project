import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Location } from '../entities/location.entity';
import { LocationEntityDto } from './dto/location-entity.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/guard/role.decorator';
import { Role } from 'src/entities/user.entity';
import { LocationService } from './location.service';
import { LocationsDto } from './dto/locations.dto';
import { LocationCoordinationDto } from './dto/location-coordinate.dto';

@ApiUseTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(@Query() query: LocationCoordinationDto): Promise<LocationsDto> {
        const locations = await this.locationService.findLocations({ key: { sortFrom: { lat: query.lat, lng: query.lng } } });
        return { locations };
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN, Role.SUPERUSER)
    @Get(':id/lockers')
    async findLockersInLocation(@Param('id', new ParseIntPipe()) locationID: number): Promise<Location> {
        return await this.locationService.findLocation({ key: { locationID }, joinWith: ['lockers'] });
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post()
    async create(@Body() body: LocationEntityDto) {
        await this.locationService.create(body.description, body.lat, body.lng, body.imageURL);
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Patch('/:id')
    async edit(@Param('id', new ParseIntPipe()) id: number, @Body() body: LocationEntityDto) {
        await this.locationService.update(id, body);
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Delete('/:id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.locationService.delete(id);
    }
}
