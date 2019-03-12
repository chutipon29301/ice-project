import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, RelationId } from 'typeorm';
import { Locker } from './locker.entity';

@Entity()
export class LockerInstance {
    constructor(
        date: Date,
        locker: Locker,
    ) {
        this.date = date;
        this.locker = locker;
    }

    @PrimaryColumn()
    date: Date;

    @Column({
        type: 'boolean',
        default: true
    })
    inUsed: boolean;

    @ManyToOne(type => Locker, { primary: true })
    @JoinColumn({ referencedColumnName: 'id' })
    locker: Locker;

}
