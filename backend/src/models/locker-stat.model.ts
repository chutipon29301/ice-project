import {
    Table,
    Model,
    Column,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import Users from './users.model';
import Lockers from './locker.model';

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
