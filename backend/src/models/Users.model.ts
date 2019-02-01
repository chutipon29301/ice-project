import { Table, Model, Column, Unique, ForeignKey } from 'sequelize-typescript';
import Role from './Role.model';

@Table({
    timestamps: true,
})
export default class Users extends Model<Users> {
    @ForeignKey(() => Role)
    @Column
    public roleID: number;

    @Column
    public name: string;

    @Column
    public oAuthID: string;
}
