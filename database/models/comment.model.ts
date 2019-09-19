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
    ForeignKey,
} from 'sequelize-typescript';

import User from './user.model';
import Board from './board.model';

export default class Comment extends Model<Comment> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    public pk: number;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    public userPk: string;
  
    @ForeignKey(() => Board)
    @Column(DataType.INTEGER)
    public boardPk: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    public author: string;
  
    @AllowNull(false)
    @Column(DataType.TEXT)
    public content: string;
  
    @BelongsTo(() => User, {
      onDelete: 'CASCADE',
    })
    public user: User;
  
    @BelongsTo(() => Board, {
      onDelete: 'CASCADE',
    })
    public board: Board;
}