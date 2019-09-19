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

export default class BoardLike extends Model<BoardLike> {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pk: number;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    public userPk: string;
  
    @ForeignKey(() => Board)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public boardPk: number;
  
  
    @BelongsTo(() => User, {
      onDelete: 'CASCADE',
    })
    public user: User;
  
    @BelongsTo(() => Board, {
      onDelete: 'CASCADE',
    })
    public board: Board;
}