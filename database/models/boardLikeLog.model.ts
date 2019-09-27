import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

import Board from './board.model';
import BoardLike from './boardlike.model';
import User from './user.model';

@Table({
    timestamps: true,
})
export default class BoardLikeLog extends Model<BoardLikeLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public board_pk: number;

  @ForeignKey(() => BoardLike)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public like_pk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public board_title: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public board_content: string;  

  @AllowNull(true)
  @Column(DataType.STRING)
  public author: string;


  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public like: boolean;

  @BelongsTo(() => User, {
      onDelete: 'CASCADE'
  })
  public user: User;

  @BelongsTo(() => Board, {
      onDelete: 'CASCADE',
  })
  public board: Board
}