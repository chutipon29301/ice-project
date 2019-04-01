import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { LockerInstance } from './locker-instance.entity';
import { User } from './user.entity';

@Entity()
export class CanAccessRelation {
    constructor(
        accessibleUser: User,
        accessibleLockerInstance: LockerInstance,
    ) {
        this.accessibleUser = accessibleUser;
        this.accessibleLockerInstance = accessibleLockerInstance;
    }

    @PrimaryColumn()
    nationalID: string;

    @ManyToOne(type => User, user => user.canAccesses)
    @JoinColumn([
        {
            name: 'nationalID',
            referencedColumnName: 'nationalID',
        },
    ])
    accessibleUser: User;

    @PrimaryColumn()
    lockerID: number;

    @PrimaryColumn()
    startTime: Date;

    @ManyToOne(
        type => LockerInstance,
        lockerInstance => lockerInstance.canAccesses,
    )
    @JoinColumn([
        {
            name: 'lockerID',
            referencedColumnName: 'lockerID',
        },
        {
            name: 'startTime',
            referencedColumnName: 'startTime',
        },
    ])
    accessibleLockerInstance: LockerInstance;
}
