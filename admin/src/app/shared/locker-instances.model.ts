import { User } from './user.model';

export class LockerInstances {
    constructor(public ownerUser: User, public lockerID: number, public inUsed: boolean) {}
  }
