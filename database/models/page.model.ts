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
  Table,
} from 'sequelize-typescript';

import PageBoard from './pageBoard.model';
import PageLike from './pageLike.model';
import User from './user.model';

@Table({
  timestamps: false,
})

export default class Page extends Model<Page> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: User;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public pageName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public content: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public introduction: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @HasMany(() => PageBoard)
  public pageBoard: PageBoard[];

  @HasMany(() => PageLike)
  public pageLike: PageLike[];
}