import { Table, Model, Column, NotNull, ForeignKey } from 'sequelize-typescript';
import Users from './User.model';
import Lockers from './Locker.model';

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
