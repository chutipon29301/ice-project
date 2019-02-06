import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import Lockers from './locker.model';
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

    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
