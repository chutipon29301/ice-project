import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @Column
  name: string;
}
