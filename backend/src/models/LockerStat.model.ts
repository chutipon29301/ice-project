import {
    Table,
    Model,
    Column,
    NotNull,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Locker.model';

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
