import {
  AllowNull,
  Column,
  AutoIncrement,
  DataType,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import User from './user.model';
import Board from './board.model';

@Table({
  timestamps: true,
})
export default class BoardLike extends Model<BoardLike> {
  @PrimaryKey
  @AutoIncrement
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

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public like: boolean;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Board, {
    onDelete: 'CASCADE',
  })
  public board: Board;
}