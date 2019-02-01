import {
    Table,
    Model,
    Column,
    NotNull,
    ForeignKey,
} from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Locker.model';
import Role from './Role.model';

@Table({
    timestamps: true,
})
export default class LockerPermission extends Model<LockerPermission> {
    
    @ForeignKey(() => Role)
    @Column
    public roleID: number;

    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
