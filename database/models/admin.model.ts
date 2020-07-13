import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Group from './group.model';

@Table({
  timestamps: false,
})
export default class Admin extends Model<Admin> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => Group)
  public group: Group[];
}