import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class Users extends Model<Users> {
  @Column
  name: string;
}
