import { Entity, OneToMany, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { LockerInstance } from './locker-instance.entity';

@Entity()
export class QRCode {

    // constructor( lockerInstance: LockerInstance) {

    // }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lockerID: number;

    @Column()
    instanceDate: Date;

    @ManyToOne(type => LockerInstance, lockerInstance => lockerInstance.qrCodes)
    @JoinColumn([
        { name: 'lockerID', referencedColumnName: 'lockerID' },
        { name: 'instanceDate', referencedColumnName: 'startTime' },
    ])
    lockerInstance: LockerInstance;

    @Column()
    expireDate: Date;

}
