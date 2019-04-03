import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Locker } from './locker.entity';
import { User } from './user.entity';


@Entity()
export class Group {
    constructor(name: string) {
        this.name = name;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, user => user.groups)
    @JoinTable()
    users: User[];

    @JoinTable()
    lockers: Locker[];
}
