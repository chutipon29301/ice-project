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
export default class Permission extends Model<Permission> {
    @NotNull
    @Column
    public expiredDate: Date;

    @NotNull
    @ForeignKey(() => Users)
    @Column
    public userID: string;

    @NotNull
    @ForeignKey(() => Lockers)
    @Column
    public lockerID: string;
}
