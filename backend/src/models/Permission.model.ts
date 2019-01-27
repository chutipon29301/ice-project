import {
    Table,
    Model,
    Column,
    NotNull,
    ForeignKey,
} from 'sequelize-typescript';
import Users from './User.model';
import Lockers from './Locker.model';

@Table({
    timestamps: true,
})
export default class Permission extends Model<Permission> {
    @NotNull
    @Column
    expired: string;

    @NotNull
    @ForeignKey(() => Users)
    @Column
    userID: string;

    @NotNull
    @ForeignKey(() => Lockers)
    @Column
    lockerID: string;
}
