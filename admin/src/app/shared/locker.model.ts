import { Location } from './location.model';
import { LockerInstances } from './locker-instances.model';

export class Locker {
    constructor(public serialNumber: string, public name: string, public number: string, public availability: string,
       public id: number, public location: Location, public instance: LockerInstances) {}
  }
