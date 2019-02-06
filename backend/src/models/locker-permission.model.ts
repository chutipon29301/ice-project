import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Lockers from './locker.model';
import Group from './group.model';

@Table({
    timestamps: true,
})
export default class LockerPermission extends Model<LockerPermission> {
    @ForeignKey(() => Group)
    @Column
    public groupID: number;

    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
