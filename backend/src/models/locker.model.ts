import {
    Table,
    Model,
    Column,
    ForeignKey,
    DataType,
    Default,
    BelongsToMany,
} from 'sequelize-typescript';
import Location from './location.model';
import LockerPermission from './locker-permission.model';
import Group from './group.model';

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

    @Column
    number: string;

    @Default(LockerStatus.AVAILABLE)
    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    status: LockerStatus;
}
