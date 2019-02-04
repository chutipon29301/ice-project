import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Users from './Users.model';

@Table({
    timestamps: true,
})
export default class Score extends Model<Score> {
    @Column
    @ForeignKey(() => Users)
    public userID: string;

    @Column
    public totalHours: number;
}
