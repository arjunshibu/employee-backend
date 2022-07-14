import EntityNotFoundException from '../exception/EntityNotFoundException';
import DepartmentRepository, {
  updatableData,
} from '../repositories/DepartmentRepository';
import { ErrorCodes } from '../util/errorCode';

export default class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async getAllDepartments() {
    return await this.departmentRepository.getAllDepartments();
  }

  async getDepartment(id: string) {
    try {
      const data = await this.departmentRepository.getDepartment(id);

      if (!data) {
        throw new EntityNotFoundException(
          ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
        );
      }

      return data;
    } catch (error) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
  }

  async createDepartment(name: string) {
    const createdDepartment = await this.departmentRepository.createDepartment(
      name
    );

    return createdDepartment;
  }

  async deleteDepartment(id: string) {
    try {
      const result = await this.departmentRepository.deleteDepartment(id);

      if (!result.affected) {
        throw new EntityNotFoundException(
          ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
        );
      }

      return result;
    } catch (error) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
  }

  async updateDepartment(id: string, newData: updatableData) {
    try {
      return await this.departmentRepository.updateDepartment(id, newData);
    } catch (error) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
  }
}
