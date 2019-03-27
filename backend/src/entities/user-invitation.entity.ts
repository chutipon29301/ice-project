import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Locker } from './locker.entity';
import * as moment from 'moment';

@Entity()
export class UserInvitation {
    constructor(locker: Locker) {
        this.locker = locker;
        this.expireDate = moment()
            .add(30, 'minutes')
            .toDate();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lockerID: number;

    @ManyToOne(type => Locker, locker => locker.userInvitations)
    @JoinColumn([{ name: 'lockerID', referencedColumnName: 'id' }])
    locker: Locker;

    @Column()
    expireDate: Date;
}
