import {
    Table,
    Model,
    Column,
    ForeignKey,
    DataType,
    Default,
} from 'sequelize-typescript';
import Location from './location.model';

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

    @Default(LockerStatus.AVAILABLE)
    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    status: LockerStatus;
}
