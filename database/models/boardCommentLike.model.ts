import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Board from './board.model';
import BoardComment from './boardComment.model';
import User from './user.model';

@Table({
    timestamps: true,
})
export default class BoardCommentLike extends Model<BoardCommentLike> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public borad_pk: number;

  @ForeignKey(() => BoardComment)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public comment_pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public user_name: string;

  @BelongsTo(() => User, {
      onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => BoardComment, {
      onDelete: 'CASCADE'
  })
  public boardComment: BoardComment;

  @BelongsTo(() => Board, {
      onDelete: 'CASCADE'
  })
  public board: Board;
}