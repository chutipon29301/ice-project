import { UnauthorizedException } from '@nestjs/common';
import {
    Column,
    DataType,
    Default,
    Model,
    Table,
    HasMany,
    BelongsToMany,
    IFindOptions,
} from 'sequelize-typescript';
import LockerOwner from './locker-owner.model';
import UserPermission from './user-permission.model';
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

    @HasMany(() => LockerOwner)
    public owns: LockerOwner[];

    @HasMany(() => UserPermission)
    public permission: UserPermission[];

    @BelongsToMany(() => Group, () => UserGroup)
    public groups: Group[];

    public static async checkExistUsersID(userID: number): Promise<boolean> {
        const user = await this.findByPk(userID, { attributes: ['id'] });
        return user != null;
    }

    public static async getUserFromLineID(lineID: string, options?: IFindOptions<Users>): Promise<Users> {
        const user = await this.findOne({
            ...options,
            where: { ...options.where, oAuthID: lineID, tokenType: TokenType.LINE },
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
        const user = await this.findByPk(userID, {
            attributes: ['role'],
        });
        if (user) {
            return roles.indexOf(user.role) !== -1;
        } else {
            throw new UnauthorizedException('User not registered');
        }
    }
}
