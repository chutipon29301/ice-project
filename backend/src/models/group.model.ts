import {
    Table,
    Model,
    Column,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';
import Users from './users.model';
import UserGroup from './user-group.model';
import Locker from './locker.model';
import LockerPermission from './locker-permission.model';

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
