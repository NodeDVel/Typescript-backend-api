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

import BoardComment from './boardComment.model';
import BoardCommentLike from './boardCommentLike.model';
import BoardLike from './boardlike.model';
import Hastag from './hastag.model';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class Board extends Model<Board> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => BoardLike)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public like_pk: BoardLike;

  @ForeignKey(() => Hastag)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public hastag_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public hastag_name: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public hashtag_registration: boolean

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

  @HasMany(() => BoardComment, {
    onDelete: 'CASCADE',
  })
  public boardComment: BoardComment[];

  @HasMany(() => BoardLike, {
    onDelete: 'CASCADE',
  })
  public BoardLike: BoardLike[];

  @HasMany(() => BoardCommentLike)
  public boardCommentLike: BoardCommentLike[];

  @HasMany(() => Hastag)
  public hastag: Hastag[];
}