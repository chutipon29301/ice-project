import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import Location from '../models/location.model';
import { CreateLocationDto } from './dto/create-location.dto';
import { EditLocationDto } from './dto/edit-location.dto';
import {
    ApiUseTags,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';

@ApiUseTags('location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}
    @ApiBadRequestResponse({ description: 'cannot get list of locations' })
    @Get()
    async listLocations(): Promise<Location[]> {
        return await this.locationService.list();
    }

    @ApiCreatedResponse({ description: 'new location is created successfully' })
    @ApiBadRequestResponse({ description: 'cannot create location' })
    @Post()
    addLocation(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(
            createLocationDto.name,
            createLocationDto.detail,
        );
    }

    @ApiOkResponse({ description: 'editing data is successful' })
    @ApiBadRequestResponse({ description: 'cannot edit data' })
    @Patch('/:id')
    async edit(
        @Param('id') id: string,
        @Body() editLocationDto: EditLocationDto,
    ) {
        await this.locationService.edit(parseInt(id, 10), editLocationDto);
    }

    @ApiOkResponse({ description: 'locker is deleted' })
    @ApiBadRequestResponse({ description: 'cannot delete the location' })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.locationService.delete(parseInt(id, 10));
    }
}
