import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class Location {
    constructor(description: string, lat: number, lng: number, imageURL: string) {
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.imageURL = imageURL;
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

    @Column({
        nullable: true,
    })
    imageURL: string;

    @OneToMany(type => Locker, locker => locker.location)
    lockers: Locker[];
}
