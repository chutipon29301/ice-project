import {
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    Table,
    BelongsTo,
    AllowNull,
    Unique,
} from 'sequelize-typescript';
import Group from './group.model';
import Location from './location.model';
import LockerPermission from './locker-permission.model';
import Users from './users.model';
import LockerOwner from './locker-owner.model';
import LockerStat from './locker-stat.model';

export enum LockerStatus {
    UNREGISTERED = 'UNREGISTERED',
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
    DELETE = 'DELETE',
}

@Table({
    timestamps: true,
})
export default class Locker extends Model<Locker> {
    @AllowNull(true)
    @Column
    name: string;

    @AllowNull(true)
    @ForeignKey(() => Location)
    @Column
    locationID: number;

    @AllowNull(true)
    @Unique
    @Column
    number: string;

    @AllowNull(true)
    @Column
    serial: string;

    @Default(LockerStatus.AVAILABLE)
    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    status: LockerStatus;

    @BelongsToMany(() => Group, () => LockerPermission)
    public groups: Group[];

    @BelongsToMany(() => Users, () => LockerOwner)
    public owners: Users[];

    @BelongsToMany(() => Users, () => LockerStat)
    public usedBy: Users[];
}
