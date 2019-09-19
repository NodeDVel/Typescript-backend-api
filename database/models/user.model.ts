import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
    BelongsTo,
} from 'sequelize-typescript';

import Board from './board.model';
import BoardLike from './boardlike.model';

export default class User extends Model<User> {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    public pk: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public name: string;

    @HasMany(() => Board)
    public board: Board;

    @HasMany(() => BoardLike)
    public boardLike: BoardLike;

}