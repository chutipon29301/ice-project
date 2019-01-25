import { Table, Model, Column, PrimaryKey, NotNull, AutoIncrement, ForeignKey } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class Location extends Model<Location> {

  @Column
  name: string;

}
