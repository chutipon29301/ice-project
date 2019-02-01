import {
    Table,
    Model,
    Column,
    NotNull,
    ForeignKey,
    BelongsTo,
    DataType,
} from 'sequelize-typescript';
import Location from './Location.model';

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


    @Column
    number: string;


    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    status: LockerStatus;
}
