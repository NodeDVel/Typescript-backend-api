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

import PageLike from './pageLike.model';
import User from './user.model';
    
@Table({
  timestamps: false,
})

export default class PageBoard extends Model<PageBoard> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => PageBoard)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public page_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string;
  
  @AllowNull(false)
  @Column(DataType.TEXT)
  public content: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;
  
  @BelongsTo(() => PageLike, {
    onDelete: 'CASCADE',
  })
  public pageLike: PageLike;
}