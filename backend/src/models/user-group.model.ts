import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Group from './group.model';
import Users from './users.model';

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
