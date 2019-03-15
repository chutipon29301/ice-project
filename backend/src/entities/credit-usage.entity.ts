import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CreditUsage {

    constructor(amount: number, user: User) {
        this.amount = amount;
        this.user = user;
    }

    @ManyToOne(type => User, { primary: true , cascade: true})
    @JoinColumn({ referencedColumnName: 'nationalID' })
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
