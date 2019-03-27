import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { LockerUsage } from './locker-usage.entity';
import { Locker } from './locker.entity';
import { User } from './user.entity';
import { QRCode } from './qr-code.entity';

@Entity()
export class LockerInstance {
    constructor(startTime: Date, locker: Locker, ownerUser: User) {
        this.startTime = startTime;
        this.locker = locker;
        this.ownerUser = ownerUser;
    }

    @PrimaryColumn()
    lockerID: number;

    @ManyToOne(type => Locker, locker => locker.lockerInstances, { cascade: true })
    @JoinColumn([{ name: 'lockerID', referencedColumnName: 'id' }])
    locker: Locker;

    @Column({
        type: 'boolean',
        default: true,
    })
    inUsed: boolean;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
        primary: true,
    })
    startTime: Date;

    @Column({
        nullable: true,
        default: null,
    })
    endTime: Date;

    @ManyToMany(type => User)
    @JoinTable()
    accessibleUsers: User[];

    @ManyToOne(type => User, user => user.ownerOfLockerInstance)
    ownerUser: User;

    @OneToMany(type => LockerUsage, lockerUsage => lockerUsage.lockerInstance)
    lockerUsages: LockerUsage[];
}
