import {
    LockerRepository,
    LockerOwnerRepository,
    LockerStatRepository,
} from '../config';
import Locker from '../models/locker.model';
import LockerOwner from 'src/models/locker-owner.model';
import LockerStat from 'src/models/locker-stat.model';

export const lockerProviders = [
    {
        provide: LockerRepository,
        useValue: Locker,
    },
    {
        provide: LockerOwnerRepository,
        useValue: LockerOwner,
    },
    {
        provide: LockerStatRepository,
        useValue: LockerStat,
    },
];
