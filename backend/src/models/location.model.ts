import { Table, Model, Column } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export default class Location extends Model<Location> {
    @Column
    name: string;

    @Column
    detail: string;
}
