import {
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import Group from './group.model';
import Location from './location.model';
import LockerPermission from './locker-permission.model';
import Users from './users.model';
import UserPermission from './user-permission.model';

export enum LockerStatus {
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
}

@Table({
    timestamps: true,
})
export default class Locker extends Model<Locker> {
    @Column
    name: string;

    @ForeignKey(() => Location)
    @Column
    locationID: number;

    @BelongsToMany(() => Group, () => LockerPermission)
    public groups: Group[];

    @BelongsToMany(() => Users, () => UserPermission)
    public accessibleUsers: Users[];

    @Column
    number: string;

    @Default(LockerStatus.AVAILABLE)
    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    status: LockerStatus;
}
