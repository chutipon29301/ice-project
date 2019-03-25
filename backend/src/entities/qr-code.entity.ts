import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class QRCode {

    constructor( locker: Locker) {
        this.locker =  locker;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lockerID: number;

    @Column()
    instanceDate: Date;

    @ManyToOne(type => Locker)
    @JoinColumn([
        {name: 'lockerID', referencedColumnName: 'id'}
    ])
    locker: Locker;

    @Column()
    expireDate: Date;

}
