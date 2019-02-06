import Location from '../models/location.model';
import { LocationRepository } from '../config';

export const locationProviders = [
    {
        provide: LocationRepository,
        useValue: Location,
    },
];
