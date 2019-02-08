import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import LockerOwner from './locker-owner.model';
import Users from './users.model';

@Table({
    timestamps: true,
})
export default class UserPermission extends Model<UserPermission> {
    @ForeignKey(() => Users)
    @Column
    public userID: number;

    @ForeignKey(() => LockerOwner)
    @Column
    public lockerOwnerID: number;
}
