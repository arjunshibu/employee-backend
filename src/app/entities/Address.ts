import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import AbstractEntity from './Abstract';

@Entity('address')
export default class Address extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public address: string;

  @Column({ nullable: false })
  public city: string;

  @Column({ nullable: false })
  public district: string;

  @Column({ nullable: false })
  public state: string;

  @Column({ nullable: false })
  public country: string;
}
