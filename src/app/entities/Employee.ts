import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AbstractEntity from './Abstract';
import Address from './Address';
import Department from './Department';

export enum employeeRole {
  ADMIN = 'admin',
  HR = 'hr',
  MANAGER = 'manager',
  ENGINEER = 'engineer',
}

@Entity('employee')
export default class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @ManyToOne(() => Department, { cascade: true })
  @JoinColumn()
  public department: Department;

  @Column({ nullable: false })
  public departmentId: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  public address: Address;

  @Column({ type: 'enum', enum: employeeRole })
  public role: employeeRole;
}
