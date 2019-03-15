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

    @PrimaryColumn()
    lockerId: string;

    @PrimaryColumn()
    instanceDate: Date;

    @ManyToOne(type => LockerInstance, { cascade: true })
    @JoinColumn([{ name: 'lockerId', referencedColumnName: 'lockerId' }, { name: 'instanceDate', referencedColumnName: 'date' }])
    lockerInstance: LockerInstance;

    @ManyToMany(type => User)
    @JoinTable()
    users: User[];

}
