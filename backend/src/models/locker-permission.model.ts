import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Lockers from './locker.model';
import Role from './role.model';

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
