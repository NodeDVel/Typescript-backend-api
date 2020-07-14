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

import Admin from './admin.model';
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

  @ForeignKey(() => Admin)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public admin_pk: Admin['pk'];

  @AllowNull(false)
  @Column(DataType.STRING)
  public admin_name: Admin["name"];
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

}