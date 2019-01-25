import { Table, Model, Column, PrimaryKey, NotNull, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Lockers.model';

@Table({
    timestamps: true,
})
export default class Permissions extends Model<Permissions> {

    @NotNull
    @Column
    expired: string;

    @NotNull
    @ForeignKey(() => Users)
    @Column
    userID: string;

    @NotNull
    @ForeignKey(() => Lockers)
    @Column
    lockerID: string;


}
