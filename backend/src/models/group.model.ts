import {
    Column,
    Model,
    Table,
    HasMany,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import Users from './users.model';
import UserGroup from './user-group.model';

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
}
