import { Table, Model, Column, NotNull, ForeignKey } from 'sequelize-typescript';
import Location from './Location.model';

@Table({
  timestamps: true,
})
export default class Locker extends Model<Locker> {

  @NotNull
  @Column
  name: string;

  @NotNull
  @ForeignKey(() => Location)
  @Column
  locationID: string;

  @Column
  number: number;

}
