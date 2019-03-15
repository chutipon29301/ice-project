import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { LockerUsage } from './locker-usage.entity';
import { LockerInstance } from './locker-instance.entity';
import { CreditUsage } from './credit-usage.entity';

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
        nationalID: number,
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
    nationalID: number;

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

    @ManyToMany(type => LockerUsage)
    @JoinTable()
    lockerUsages: LockerUsage[];

    @ManyToMany(type => LockerInstance)
    accessibleLockerInstance: LockerInstance[];

    @OneToMany(type => LockerInstance, lockerInstance => lockerInstance.ownerUser)
    ownerOfLockerInstance: LockerInstance[];

    @OneToMany(type => CreditUsage, creditUsage => creditUsage.user)
    creditUsages: CreditUsage[];
}
