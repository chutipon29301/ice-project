import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';
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
    lockerID: string;

    @PrimaryColumn()
    instanceDate: Date;

    @ManyToOne(type => LockerInstance, { cascade: true })
    @JoinColumn([
        { name: 'lockerID', referencedColumnName: 'lockerID' },
        { name: 'instanceDate', referencedColumnName: 'startTime' },
    ])
    lockerInstance: LockerInstance;

    @OneToMany(type => User, user => user.nationalID, { nullable: true })
    users: User;
}
