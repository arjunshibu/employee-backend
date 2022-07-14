import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AbstractEntity from './Abstract';
import Employee from './Employee';

@Entity('department')
export default class Department extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  @JoinColumn()
  public employee: Employee[];
}
