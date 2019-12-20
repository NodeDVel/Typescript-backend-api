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

import Page from "./page.model";
import PageBoard from './pageBoard.model'

@Table({    
  timestamps: false,
})

export default class PageLike extends Model<PageLike> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Page)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public page_pk: number;

  @ForeignKey(() => PageBoard)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public board_pk: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public _likePk: boolean;

  @BelongsTo(() => Page, {
    onDelete: 'CASCADE', 
  })
  public page: Page;
  
  @BelongsTo(() => PageBoard, {
    onDelete: 'CASCADE',
  })
  public pageBoard: PageBoard;
} 