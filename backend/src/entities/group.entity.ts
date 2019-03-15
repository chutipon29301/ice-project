import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Locker } from "./locker.entity";

@Entity()
export class Group{
    constructor(name:string){
        this.name = name;
    }
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string

    @ManyToMany(type => User)
    @JoinTable()
    users: User[];

    @ManyToMany(type => Locker)
    @JoinTable()
    lockers: Locker[];

}
}
