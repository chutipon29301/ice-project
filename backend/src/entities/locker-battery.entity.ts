import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Locker } from './locker.entity';
@Entity()
export class LockerBattery {
    @Column({
        type: 'double',
    })
    amount: number;

    @PrimaryColumn({
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(type => Locker, { primary: true, cascade: true })
    @JoinColumn({ referencedColumnName: 'id' })
    locker: Locker;
}
