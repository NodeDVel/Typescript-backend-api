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

import Group from './group.model';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class Event extends Model<Event> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() =>  User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => Group)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public group_pk: number;

  @Column(DataType.STRING)
  public eventName: string;

  @Column(DataType.TEXT)
  public description: string;

  @Column(DataType.INTEGER)
  public period: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Group, {
    onDelete: 'CASADE',
  })
  public group: Group;
}