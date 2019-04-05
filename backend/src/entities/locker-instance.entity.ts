import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { CanAccessRelation } from './can-access.entity';
import { LockerUsage } from './locker-usage.entity';
import { Locker } from './locker.entity';
import { UserInvitation } from './user-invitation.entity';
import { User } from './user.entity';

@Entity()
export class LockerInstance {
    constructor(locker: Locker, ownerUser: User) {
        this.locker = locker;
        this.ownerUser = ownerUser;
    }

    @PrimaryColumn()
    lockerID: number;

    @ManyToOne(type => Locker, locker => locker.lockerInstances, {
        cascade: true,
    })
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

    @OneToMany(
        type => CanAccessRelation,
        canAccessRelation => canAccessRelation.accessibleLockerInstance,
    )
    canAccesses: CanAccessRelation[];

    @Column()
    userID: string;

    @ManyToOne(type => User, user => user.ownerOfLockerInstance)
    @JoinColumn([{ name: 'userID', referencedColumnName: 'nationalID' }])
    ownerUser: User;

    @OneToMany(type => LockerUsage, lockerUsage => lockerUsage.lockerInstance)
    lockerUsages: LockerUsage[];

    @OneToMany(
        type => UserInvitation,
        userInvitation => userInvitation.lockerInstance,
        { nullable: true },
    )
    userInvitations: UserInvitation[];
}
