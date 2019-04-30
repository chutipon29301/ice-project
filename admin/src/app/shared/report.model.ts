import { Locker } from './locker.model';

export class Report {
    constructor(public message: string, public lockerID: number, public id: number,
       public createdDate: string, public resolved: boolean, public locker: Locker) {}
  }
