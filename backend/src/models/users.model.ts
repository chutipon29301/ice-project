import {
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    Table,
} from 'sequelize-typescript';
import Group from './group.model';
import LockerOwner from './locker-owner.model';
import LockerPermission from './locker-permission.model';
import Locker from './locker.model';
import UserGroup from './user-group.model';
import UserPermission from './user-permission.model';
import { UnauthorizedException } from '@nestjs/common';
import LockerStat from './locker-stat.model';

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

    @BelongsToMany(() => LockerOwner, () => UserPermission)
    public hasPermissionTo: LockerOwner[];

    @BelongsToMany(() => Locker, () => LockerOwner)
    public ownedLockers: Locker[];

    @BelongsToMany(() => Locker, () => LockerStat)
    public histories: Locker[];

    public static async checkExistUsersID(userID: number): Promise<boolean> {
        const user = await this.findByPk(userID);
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

    public static async canActivate(
        userID: number,
        ...roles: Role[]
    ): Promise<boolean> {
        const user = await this.findByPk(userID);
        if (user) {
            return roles.indexOf(user.role) !== -1;
        } else {
            throw new UnauthorizedException('User not registered');
        }
    }
}
