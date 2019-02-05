import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Role from './role.model';

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
