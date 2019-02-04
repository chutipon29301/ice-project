import { Table, Model, Column } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export default class Role extends Model<Role> {
    @Column
    public name: string;

    @Column
    public maxHours: number;
}
