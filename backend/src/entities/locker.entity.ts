import {
    Column,
    Entity,
    Generated,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Location } from './location.entity';
import { LockerInstance } from './locker-instance.entity';
import { QRCode } from './qr-code.entity';

export enum LockerAvailability {
    UNREGISTERED = 'UNREGISTERED',
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
    DELETE = 'DELETE',
}

@Entity()
export class Locker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'uuid',
        unique: true,
    })
    @Generated('uuid')
    serialNumber: string;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    number: string;

    @Column({
        type: 'enum',
        enum: LockerAvailability,
        default: LockerAvailability.UNREGISTERED,
    })
    availability: LockerAvailability;

    @ManyToOne(type => Location, location => location.lockers)
    location: Location;

    @OneToMany(type => LockerInstance, lockerInstance => lockerInstance.locker)
    lockerInstances: LockerInstance[];

    @ManyToMany(type => Group)
    @JoinTable()
    groups: Group[];

    @OneToMany(type => QRCode, qrCode => qrCode.locker, { nullable: true })
    qrCodes: QRCode[];
}
