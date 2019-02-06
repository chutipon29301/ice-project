import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import LockerPermission from './locker-permission.model';
import Locker from './locker.model';
import UserGroup from './user-group.model';
import Users from './users.model';

@Table({
    timestamps: true,
})
export default class Group extends Model<Group> {
    @Column
    public name: string;

    @Column
    public maxHours: number;

    @BelongsToMany(() => Users, () => UserGroup)
    users: Users[];

    @BelongsToMany(() => Locker, () => LockerPermission)
    locker: Locker[];
}
