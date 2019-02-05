import {
    Table,
    Model,
    Column,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import Users from './users.model';
import Lockers from './locker.model';

@Table({
    timestamps: true,
})
export default class LockerUsage extends Model<LockerUsage> {
    @Column
    public start: Date;

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
