import {
    Table,
    Model,
    Column,
    BelongsToMany,
    DataType,
    Default,
} from 'sequelize-typescript';
import Group from './group.model';
import UserGroup from './user-group.model';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Table({
    timestamps: true,
})
export default class Users extends Model<Users> {

    @Column
    public name: string;

    @Column
    public oAuthID: string;

    @Default(Role.USER)
    @Column(DataType.ENUM(Object.keys(Role)))
    public role: Role;

    @BelongsToMany(() => Group, () => UserGroup)
    public groups: Group[];

    public static async checkExistUsersID(userID: number): Promise<boolean> {
        const user = await this.findById(userID);
        return user != null;
    }
}
