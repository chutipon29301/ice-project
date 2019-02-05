import { LockerRepository } from '../config';
import Locker from '../models/locker.model';

export const lockerProviders = [
    {
        provide: LockerRepository,
        useValue: Locker,
    },
];
