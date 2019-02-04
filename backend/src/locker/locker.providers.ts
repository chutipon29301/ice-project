import { LockerRepository } from '../config';
import Locker from '../models/Locker.model';

export const lockerProviders = [
    {
        provide: LockerRepository,
        useValue: Locker,
    },
];
