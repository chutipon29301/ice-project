import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, RelationId, ManyToMany, OneToMany } from 'typeorm';
import { Locker } from './locker.entity';
import { User } from './user.entity';

@Entity()
export class LockerInstance {
    constructor(
        date: Date,
        locker: Locker,
    ) {
        this.date = date;
        this.locker = locker;
    }

    @ManyToOne(type => Locker, { primary: true, cascade: true })
    @JoinColumn({ referencedColumnName: 'id' })
    locker: Locker;

    @PrimaryColumn()
    date: Date;

    @Column({
        type: 'boolean',
        default: true
    })
    inUsed: boolean;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    startTime: Date;

    @Column({
        nullable: true,
        default: null,
    })
    endTime: Date;

    @ManyToMany(type => User)
    accessibleUsers: User[];

    @ManyToOne(type => User, user => user.ownerOfLockerInstance)
    ownerUser: User;
}
