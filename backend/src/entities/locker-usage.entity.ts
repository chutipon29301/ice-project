import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { LockerInstance } from './locker-instance.entity';
import { Locker } from './locker.entity';
import { User } from './user.entity';

export enum ActionType {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE'
}
@Entity()
export class LockerUsage {
    @Column({
        type: 'enum',
        enum: ActionType,
        default: ActionType.OPEN
    })
    actionType: ActionType;

    @PrimaryColumn({
        default: () => 'CURRENT_TIMESTAMP',
    })
    timeStamp: Date;

    @ManyToOne(type => LockerInstance, { primary: true, cascade: true })
    @JoinColumn({ referencedColumnName: 'date' })
    date: Date;

    @ManyToOne(type => LockerInstance, { primary: true, cascade: true })
    @JoinColumn({ referencedColumnName: 'locker' })
    locker: Locker;

    @ManyToMany(type => User)
    @JoinTable()
    users: User[];

}
