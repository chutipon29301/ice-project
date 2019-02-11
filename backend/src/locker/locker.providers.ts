import {
    LockerRepository,
    LockerOwnerRepository,
    LockerStatRepository,
    UsersRepository,
} from '../config';
import Locker from '../models/locker.model';
import LockerOwner from '../models/locker-owner.model';
import LockerStat from '../models/locker-stat.model';
import Users from '../models/users.model';

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
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
