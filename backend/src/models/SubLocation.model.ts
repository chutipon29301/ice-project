import {
    Table,
    Model,
    Column,
    ForeignKey,
    HasOne,
    BelongsTo,
} from 'sequelize-typescript';
import Location from './Location.model';

@Table({
    timestamps: true,
})
export default class SubLocation extends Model<SubLocation> {
    @ForeignKey(() => Location)
    @Column
    public parentID: number;

    @ForeignKey(() => Location)
    @Column
    public childID: number;

    // @HasOne(() => Location, { foreignKey: 'childID' })
    // public child: Location;

    // @BelongsTo(() => Location, { foreignKey: 'parentID' })
    // public parent: Location;
}
