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
import { Roles } from 'src/guard/role.decorator';
import { Role } from 'src/entities/user.entity';

@ApiUseTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(): Promise<{ locations: Location[] }> {
        const locations = await this.locationService.list();
        return { locations };
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post()
    async create(@Body() body: LocationEntityDto) {
        await this.locationService.create(body.description, body.lat, body.lng);
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Patch('/:id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: LocationEntityDto,
    ) {
        await this.locationService.update(id, body);
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Delete('/:id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.locationService.delete(id);
    }
}
