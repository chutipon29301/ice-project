import {
    AllowNull,
    BelongsTo,
    Column,
    Default,
    ForeignKey,
    Model,
    Table,
    HasMany,
} from 'sequelize-typescript';
import Locker from './locker.model';
import Users from './users.model';
import UserPermission from './user-permission.model';

@Table({
    timestamps: true,
})
export default class LockerOwner extends Model<LockerOwner> {
    @Column
    public start: Date;

    @Default(null)
    @AllowNull(true)
    @Column
    public end: Date;

    @ForeignKey(() => Users)
    @Column
    public userID: number;

    @ForeignKey(() => Locker)
    @Column
    public lockerID: number;

    @BelongsTo(() => Locker)
    public locker: Locker;

    @HasMany(() => UserPermission)
    public permissions: UserPermission;
}
