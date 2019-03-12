import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class LockerInstance {

    @Column()
    inUsed: boolean;

    @Column()
    date: Date;

    @ManyToOne(type => Locker)
    locker: Locker;
}
