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
    ForeignKey
} from 'sequelize-typescript';

import User from './user.model';
import BoardLike from './boardlike.model';

export default class Board extends Model<Board> {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pk: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    public userPk: string;

    @Column(DataType.STRING)
    public title: string;

    @Column(DataType.TEXT)
    public content: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public author: string;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
    })
    public user: User;

    @HasMany(() => BoardLike, {
        onDelete: 'CASCADE',
    })
    public BoardLike: BoardLike;
}
