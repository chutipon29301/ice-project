import { Injectable } from '@nestjs/common';
import Location from '../models/Location.model';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
    locations: Location[] = [];

    get findAll(): Location[] {
        return this.locations;
    }

    addLocation(name: string) {
        const location = new CreateLocationDto();
        location.name = name;
    }
}
