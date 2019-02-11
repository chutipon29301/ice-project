import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Users from './users.model';

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
