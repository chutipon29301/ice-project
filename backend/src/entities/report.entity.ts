import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Report {

    constructor(message) {
        this.message = message;
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
}
