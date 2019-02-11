import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo,
} from 'sequelize-typescript';
import Locker from './locker.model';
import Users from './users.model';

export enum CurrentStatus {
    LOCK = 'LOCK',
    UNLOCK = 'UNLOCK',
}

@Table({
    timestamps: true,
})
export default class LockerStat extends Model<LockerStat> {
    @Column(DataType.ENUM(Object.keys(CurrentStatus)))
    public status: CurrentStatus;

    @ForeignKey(() => Users)
    @Column
    public userID: number;

    @ForeignKey(() => Locker)
    @Column
    public lockerID: number;

    @BelongsTo(() => Locker)
    public locker: Locker;
}
