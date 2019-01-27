import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import Locker from './Locker.model';

@Table({
    timestamps: true,
})
export default class Location extends Model<Location> {
    @Column
    name: string;

    @HasMany(() => Locker)
    lockers: Locker[];
}
