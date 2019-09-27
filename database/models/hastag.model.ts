import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Board from './board.model';
import User from './user.model';

export default class Hastag extends Model<Hastag> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pk: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    public user_pk: User;

    @ForeignKey(() => Board)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public board_pk: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    public name: string;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
    })
    public user: User;

    @BelongsTo(() => Board, {
        onDelete: 'CASCADE',
    })
    public board: Board;
}