import { getConnection } from 'typeorm';
import Department from '../entities/Department';

export interface updatableData {
  name: string;
}

export default class DepartmentRepository {
  async getAllDepartments() {
    const departmentRepo = getConnection().getRepository(Department);

    return await departmentRepo.find();
  }

  async getDepartment(id: string) {
    const departmentRepo = getConnection().getRepository(Department);

    return await departmentRepo.findOne({ id });
  }

  async createDepartment(name: string) {
    const departmentRepo = getConnection().getRepository(Department);

    const createdDepartment = departmentRepo.create({ name });
    createdDepartment.save();

    return createdDepartment;
  }

  async deleteDepartment(id: string) {
    const departmentRepo = getConnection().getRepository(Department);

    return await departmentRepo.softDelete({ id });
  }

  async updateDepartment(id: string, newData: updatableData) {
    const department = await this.getDepartment(id);

    newData.name && (department.name = newData.name);

    department.save();

    return department;
  }
}
