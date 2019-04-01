import * as moment from 'moment';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { LockerInstance } from './locker-instance.entity';

@Entity()
export class UserInvitation {
    constructor(lockerInstance: LockerInstance) {
        this.lockerInstance = lockerInstance;
        this.expireDate = moment()
            .add(30, 'minutes')
            .toDate();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lockerID: number;

    @ManyToOne(
        type => LockerInstance,
        lockerInstance => lockerInstance.userInvitations,
    )
    @JoinColumn([{ name: 'lockerID', referencedColumnName: 'lockerID' }])
    lockerInstance: LockerInstance;

    @Column()
    expireDate: Date;

    @Column({
        default: false,
    })
    isUsed: boolean;
}
