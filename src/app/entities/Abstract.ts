import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class AbstractEntity extends BaseEntity {
  @CreateDateColumn()
  public createdAt?: Date;
  @UpdateDateColumn()
  public updatedAt?: Date;
  @DeleteDateColumn()
  public deletedAt?: Date;
}
