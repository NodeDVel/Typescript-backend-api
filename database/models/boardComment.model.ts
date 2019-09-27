import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
} from 'sequelize-typescript';

import Board from './board.model';
import User from './user.model';
export default class BoardComment extends Model<BoardComment> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
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