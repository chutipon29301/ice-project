import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
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
