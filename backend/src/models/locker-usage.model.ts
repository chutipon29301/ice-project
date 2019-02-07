import {
    AllowNull,
    Column,
    ForeignKey,
    Model,
    Table,
    Default,
} from 'sequelize-typescript';
import Lockers from './locker.model';
import Users from './users.model';

@Table({
    timestamps: true,
})
export default class LockerUsage extends Model<LockerUsage> {
    @Column
    public start: Date;

    @Default(null)
    @AllowNull(true)
    @Column
    public end: Date;

    @ForeignKey(() => Users)
    @Column
    public userID: number;

    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
