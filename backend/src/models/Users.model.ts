import { Table, Model, Column, Unique } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export default class Users extends Model<Users> {
    @Unique
    @Column
    public lineID: string;

    @Column
    public firstName: string;

    @Column
    public lastName: string;
}
