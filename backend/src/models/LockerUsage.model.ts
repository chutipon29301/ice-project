import {
    Table,
    Model,
    Column,
    
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Locker.model';

@Table({
    timestamps: true,
})
export default class LockerUsage extends Model<LockerUsage> {
    
    @Column
    public start: Date;

    @AllowNull(true)
    @Column
    public end: Date;

    @ForeignKey(() => Users)
    @Column
    public userID: number;

    
    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
