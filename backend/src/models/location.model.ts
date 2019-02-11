import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import Locker from './locker.model';

@Table({
    timestamps: true,
})
export default class Location extends Model<Location> {
    @Column
    public name: string;

    @Column
    public detail: string;

    @HasMany(() => Locker)
    public lockers: Locker[];
}
