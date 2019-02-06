import {
    Table,
    Model,
    Column,
    ForeignKey,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';
import Users from './users.model';
import Group from './group.model';

@Table({
    timestamps: true,
})
export default class UserGroup extends Model<UserGroup> {
    @ForeignKey(() => Group)
    @Column
    groupID: number;

    @ForeignKey(() => Users)
    @Column
    userID: number;
}
