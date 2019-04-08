import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { LockerInstance } from './locker-instance.entity';
import { User } from './user.entity';

export enum ActionType {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}
@Entity()
export class LockerUsage {
    constructor(actionType: ActionType, lockerInstance: LockerInstance) {
        this.actionType = actionType;
        this.lockerInstance = lockerInstance;
    }

    @Column({
        type: 'enum',
        enum: ActionType,
        default: ActionType.OPEN,
    })
    actionType: ActionType;

    @PrimaryColumn({
        default: () => 'CURRENT_TIMESTAMP',
    })
    timeStamp: Date;

    @PrimaryColumn()
    lockerID: number;

    @PrimaryColumn()
    instanceDate: Date;

    @ManyToOne(type => LockerInstance, lockerInstance => lockerInstance.lockerUsages, { cascade: true })
    @JoinColumn([{ name: 'lockerID', referencedColumnName: 'lockerID' }, { name: 'instanceDate', referencedColumnName: 'startTime' }])
    lockerInstance: LockerInstance;

    @Column({
        nullable: true,
    })
    nationalID: string;

    @ManyToOne(type => User, user => user.lockerUsages, { nullable: true })
    @JoinColumn({
        name: 'nationalID',
        referencedColumnName: 'nationalID',
    })
    user: User;
}
