import {
    Entity,
    PrimaryColumn,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { v4 } from 'uuid';
import { Location } from './location.entity';

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

    @PrimaryColumn({
        type: 'uuid',
        default: v4(),
    })
    serialNumber: string;

    @Column()
    name: string;

    @Column()
    number: string;

    @Column({
        type: 'enum',
        enum: LockerAvailability,
        default: LockerAvailability.UNREGISTERED,
    })
    availability: LockerAvailability;

    @ManyToOne(type => Location, location => location.lockers)
    location: Location;
}
