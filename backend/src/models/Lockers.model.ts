import { Table, Model, Column, PrimaryKey, NotNull, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Location from './Locations.model';

@Table({
  timestamps: true,
})
export default class Lockers extends Model<Lockers> {

  @NotNull
  @Column
  name: string;

  @NotNull
  @ForeignKey(() => Location)
  @Column
  locationID: string;

  @Column
  number: number


}
