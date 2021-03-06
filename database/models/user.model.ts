import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Board from './board.model';
import BoardCommentLike from './boardCommentLike.model';
import BoardLike from './boardlike.model';
import CompanyRecruit from './companyRecurit.model';
import Event from './event.model';
import Group from './group.model';
import Hastag from './hastag.model';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  public pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public passwordKey: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => Board)
  public board: Board[];

  @HasMany(() => BoardLike)
  public boardLike: BoardLike[];

  @HasMany(() => BoardCommentLike)
  public boardCommentLike: BoardCommentLike[];

  @HasMany(() => Hastag)
  public hastag: Hastag[];

  @HasMany(() => CompanyRecruit)
  public companyRecurit: CompanyRecruit[];

  @HasMany(() => Group)
  public group: Group[];

  @HasMany(() => Event)
  public event: Event[];
}