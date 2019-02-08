import { LockerRepository, LockerOwnerRepository } from '../config';
import Locker from '../models/locker.model';
import LockerOwner from 'src/models/locker-owner.model';

export const lockerProviders = [
    {
        provide: LockerRepository,
        useValue: Locker,
    }, {
        provide: LockerOwnerRepository,
        useValue: LockerOwner,
    }
];
