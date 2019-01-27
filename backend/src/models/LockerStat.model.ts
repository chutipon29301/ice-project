import {
    Table,
    Model,
    Column,
    NotNull,
    ForeignKey,
} from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Locker.model';

@Table({
    timestamps: true,
})
export default class LockerStat extends Model<LockerStat> {
    @NotNull
    @Column
    public status: string;

    @NotNull
    @Column
    @ForeignKey(() => Users)
    public userID: string;

    @NotNull
    @Column
    @ForeignKey(() => Lockers)
    public lockerID: string;
}
