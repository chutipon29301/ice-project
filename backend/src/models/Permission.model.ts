import {
    Table,
    Model,
    Column,
    
    ForeignKey,
} from 'sequelize-typescript';
import Users from './Users.model';
import Lockers from './Locker.model';

@Table({
    timestamps: true,
})
export default class Permission extends Model<Permission> {
    
    @Column
    public expiredDate: Date;
    
    @ForeignKey(() => Users)
    @Column
    public userID: number;
    
    @ForeignKey(() => Lockers)
    @Column
    public lockerID: number;
}
