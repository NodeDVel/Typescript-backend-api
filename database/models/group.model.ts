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

import User from './user.model';

@Table({
  timestamps: false,
})
export default class Group extends Model<Group> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @Column(DataType.STRING)
  public groupName: string;

  @Column(DataType.STRING)
  public groupInformation: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;
}