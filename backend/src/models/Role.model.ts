import {
  Table,
  Model,
  Column,
  NotNull
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class Role extends Model<Role> {
  @Column
  public name: String;

  @Column
  public maxHours: number;
}
