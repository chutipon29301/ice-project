import { Table, Model, Column, PrimaryKey, NotNull, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Lockers.model';

@Table({
  timestamps: true,
})
export default class LockerStat extends Model<LockerStat> {

  @NotNull
  @Column
  status: string;

  @NotNull
  @Column
  @ForeignKey(() => Users)
  userID: string;

  @NotNull
  @Column
  @ForeignKey(() => Lockers)
  lockerID: string;


}
