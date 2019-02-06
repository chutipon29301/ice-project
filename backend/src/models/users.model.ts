import {
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    Table,
} from 'sequelize-typescript';
import Group from './group.model';
import UserGroup from './user-group.model';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum TokenType {
    LINE = 'LINE',
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

    @Default(TokenType.LINE)
    @Column(DataType.ENUM(Object.keys(TokenType)))
    public tokenType: TokenType;

    @BelongsToMany(() => Group, () => UserGroup)
    public groups: Group[];

    public static async checkExistUsersID(userID: number): Promise<boolean> {
        const user = await this.findById(userID);
        return user != null;
    }

    public static async getUserFromLineID(lineID: string): Promise<Users> {
        const user = await this.findOne({
            where: {
                oAuthID: lineID,
                tokenType: TokenType.LINE,
            },
        });
        return user;
    }

    public static async checkExistLineID(lineID: string): Promise<boolean> {
        const user = await this.getUserFromLineID(lineID);
        return user != null;
    }
}
