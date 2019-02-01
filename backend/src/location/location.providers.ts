import Location from 'src/models/Location.model';
import { LocationRepository } from 'src/config';

export const locationProviders = [
    {
        provide: LocationRepository,
        useValue: Location,
    },
];
