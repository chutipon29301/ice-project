import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { CreditUsage } from './credit-usage.entity';
import { Group } from './group.entity';
import { LockerInstance } from './locker-instance.entity';
import { LockerUsage } from './locker-usage.entity';
import { CanAccessRelation } from './can-access.entity';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPERUSER = 'SUPERUSER',
}

export enum AuthenticationType {
    LINE = 'LINE',
    GITHUB = 'GITHUB',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    SUSPENDED = 'SUSPENDED',
}

@Entity()
export class User {
    constructor(
        nationalID: string,
        firstName: string,
        lastName: string,
        role: Role,
        authenticationID: string,
        authenticationType: AuthenticationType,
        phone: string,
        status: UserStatus,
    ) {
        this.nationalID = nationalID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.authenticationID = authenticationID;
        this.authenticationType = authenticationType;
        this.phone = phone;
        this.status = status;
    }

    @PrimaryColumn()
    nationalID: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @Column()
    authenticationID: string;

    @Column({
        type: 'enum',
        enum: AuthenticationType,
    })
    authenticationType: AuthenticationType;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status: UserStatus;

    @Column({
        nullable: true,
    })
    profileImage: string;

    @OneToMany(type => LockerUsage, lockerUsage => lockerUsage.user)
    @JoinTable()
    lockerUsages: LockerUsage[];

    @OneToMany(type => CreditUsage, creditUsage => creditUsage.user)
    @JoinTable()
    creditUsages: CreditUsage[];

    // @ManyToMany(type => LockerInstance, lockerInstance => lockerInstance.accessibleUsers)
    // accessibleLockerInstance: LockerInstance[];

    @OneToMany(
        type => CanAccessRelation,
        canAccessRelation => canAccessRelation.accessibleUser,
    )
    canAccesses: CanAccessRelation[];

    @ManyToMany(type => Group, group => group.users)
    groups: Group[];

    @OneToMany(
        type => LockerInstance,
        lockerInstance => lockerInstance.ownerUser,
    )
    ownerOfLockerInstance: LockerInstance[];

}
