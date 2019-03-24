import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class Location {
    constructor(description: string, lat: number, lng: number) {
        this.description = description;
        this.lat = lat;
        this.lng = lng;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({
        type: 'double',
    })
    lat: number;

    @Column({
        type: 'double',
    })
    lng: number;

    @OneToMany(type => Locker, locker => locker.location)
    lockers: Locker[];
}
