import {
    AllowNull,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    Table,
    HasMany,
    BelongsTo,
} from 'sequelize-typescript';
import Location from './location.model';
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
    public name: string;

    @AllowNull(true)
    @ForeignKey(() => Location)
    @Column
    public locationID: number;

    @AllowNull(true)
    @Column
    public number: string;

    // @Unique
    @Column
    public serial: string;

    @Default(LockerStatus.UNREGISTERED)
    @Column(DataType.ENUM(Object.keys(LockerStatus)))
    public status: LockerStatus;

    @HasMany(() => LockerOwner)
    public owners: LockerOwner[];

    @HasMany(() => LockerStat)
    public lockerStatus: LockerStat[];

    @BelongsTo(() => Location)
    public location: Location;

    public static async isLockerAvailable(lockerID: number): Promise<boolean> {
        const locker = await this.findByPk(lockerID, {
            attributes: ['id'],
            where: { status: LockerStatus.AVAILABLE },
        });
        return locker !== null;
    }
}
