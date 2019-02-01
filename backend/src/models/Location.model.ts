import { Table, Model, Column, HasMany, HasOne } from 'sequelize-typescript';
import Locker from './Locker.model';
import SubLocation from './SubLocation.model';
@Table({
    timestamps: true,
})
export default class Location extends Model<Location> {

    @Column
    name: string;

    @Column
    detail: string;

    // @HasMany(() => SubLocation, 'parentID')
    // public locations: SubLocation[];

    // get subLocations(): Location[] {
    //     return this.locations.map((location) => location.child);
    // }

    // @HasOne(()=>SubLocation, 'childID')
    // public parentSubLocations: SubLocation;

}
