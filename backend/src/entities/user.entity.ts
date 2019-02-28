import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPERUSER = 'SUPERUSER',
}

export enum AuthenticationType {
    LINE = 'LINE',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    SUSPENDED = 'SUSPENDED',
}

@Entity()
export class User {
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
}
