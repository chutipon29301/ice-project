import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Generated, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { LockerInstance } from './locker-instance.entity';

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
    lockerInstance: Locker;
}
