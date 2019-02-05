import Location from 'src/models/location.model';
import { LocationRepository } from 'src/config';

export const locationProviders = [
    {
        provide: LocationRepository,
        useValue: Location,
    },
];
