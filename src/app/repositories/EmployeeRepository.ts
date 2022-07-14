import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';
import Address from '../entities/Address';
import Employee from '../entities/Employee';
import AddressAlreadyExistsException from '../exception/AddressAlreadyExistsException';
import NoAddressException from '../exception/NoAddressException';

export interface updatableData {
  name: string;
  email: string;
  departmentId: string;
}

export interface addressData {
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

export default class EmployeeRepository {
  async getAllEmployees() {
    const employeeRepo = getConnection().getRepository(Employee);

    return await employeeRepo.find({ relations: ['department', 'address'] });
  }

  async getEmployee(id: string) {
    const employeeRepo = getConnection().getRepository(Employee);

    return await employeeRepo.findOne(
      { id },
      { relations: ['department', 'address'] }
    );
  }

  async getEmployeeByEmail(email: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne({ email });

    return employee;
  }

  async createEmployee(employeeData: Employee) {
    const newEmployee = plainToClass(Employee, employeeData);

    return newEmployee.save();
  }

  async deleteEmployee(id: string) {
    const employeeRepo = getConnection().getRepository(Employee);

    return await employeeRepo.softDelete({ id });
  }

  async updateEmployee(id: string, newData: updatableData) {
    const employee = await this.getEmployee(id);

    newData.name && (employee.name = newData.name);
    newData.email && (employee.email = newData.email);
    newData.departmentId && (employee.departmentId = newData.departmentId);

    employee.save();

    return employee;
  }

  async createEmployeeAddress(id: string, address: addressData) {
    const employee = await this.getEmployee(id);

    if (employee.address !== null) {
      throw new AddressAlreadyExistsException();
    }

    employee.address = plainToClass(Address, address);
    employee.save();

    return employee.address;
  }

  async deleteEmployeeAddress(id: string) {
    const employee = await this.getEmployee(id);

    return await employee.address.softRemove();
  }

  async updateEmployeeAddress(id: string, newData: addressData) {
    const employee = await this.getEmployee(id);
    const { address } = employee;

    newData.address && (address.address = newData.address);
    newData.city && (address.city = newData.city);
    newData.district && (address.district = newData.district);
    newData.state && (address.state = newData.district);
    newData.country && (address.country = newData.district);

    return address.save();
  }
}
