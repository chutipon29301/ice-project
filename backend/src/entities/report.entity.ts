import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class Report {

    constructor(message: string, lockerID: number) {
        this.message = message;
        this.lockerID = lockerID;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column({
        default: false,
    })
    resolved: boolean;

    @Column()
    lockerID: number;

    @ManyToOne(type => Locker, locker => locker.reports, {
        cascade: true,
    })
    @JoinColumn([{ name: 'lockerID', referencedColumnName: 'id' }])
    locker: Locker;
}
