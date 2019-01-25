import { Table, Model, Column, PrimaryKey, NotNull, AutoIncrement, ForeignKey } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class Locations extends Model<Locations> {

  @NotNull
  @Column
  name: string;

}
