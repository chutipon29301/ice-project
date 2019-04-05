import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CreditUsage {
    constructor(amount: number, user: User) {
        this.amount = amount;
        this.user = user;
    }

    @PrimaryColumn()
    nationalID: string;

    @ManyToOne(type => User, user => user.creditUsages, { cascade: true })
    @JoinColumn({ name: 'nationalID', referencedColumnName: 'nationalID' })
    user: User;

    @PrimaryColumn({
        default: () => 'CURRENT_TIMESTAMP',
    })
    date: Date;

    @Column({
        type: 'int',
    })
    amount: number;
}
