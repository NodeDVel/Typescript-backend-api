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

import Hastag from './hastag.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class CompanyRecruit extends Model<CompanyRecruit> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => Hastag)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public hastag_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public information: string;
  
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public personnel: string // 지원 인원

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pay: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public area: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public hastag_name: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public confirm: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public cancel: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public pick: boolean;

  @HasMany(() => Hastag)
  public hastag: Hastag[];

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;
}