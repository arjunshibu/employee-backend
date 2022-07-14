import { compare, hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { EmployeeDto } from '../dto/EmployeeDto';
import Employee from '../entities/Employee';
import EntityNotFoundException from '../exception/EntityNotFoundException';
import IncorrectUsernameOrPasswordException from '../exception/IncorrectUsernameOrPasswordException';
import NoAddressException from '../exception/NoAddressException';
import UserNotAuthorizedException from '../exception/UserNotAuthorizedException';
import EmployeeRepository, {
  addressData,
  updatableData,
} from '../repositories/EmployeeRepository';
import { ErrorCodes } from '../util/errorCode';

export default class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async getAllEmployees() {
    return await this.employeeRepository.getAllEmployees();
  }

  async getEmployee(id: string) {
    try {
      return await this.employeeRepository.getEmployee(id);
    } catch (error) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
  }

  async createEmployee(employeeDto: EmployeeDto) {
    const { name, email, password, role, departmentId } = employeeDto;
    const employeeData = plainToClass(Employee, {
      name,
      email,
      password: password ? await hash(password, 10) : '',
      role,
      departmentId,
    });

    return await this.employeeRepository.createEmployee(employeeData);
  }

  async deleteEmployee(id: string) {
    try {
      const result = await this.employeeRepository.deleteEmployee(id);

      if (!result.affected) {
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
  }

  async updateEmployee(id: string, newData: updatableData) {
    try {
      return await this.employeeRepository.updateEmployee(id, newData);
    } catch (error) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
  }

  async createEmployeeAddress(id: string, address: addressData) {
    return await this.employeeRepository.createEmployeeAddress(id, address);
  }

  async deleteEmployeeAddress(id: string) {
    try {
      return await this.employeeRepository.deleteEmployeeAddress(id);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new NoAddressException();
      }

      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
  }

  async updateEmployeeAddress(id: string, newData: addressData) {
    try {
      return await this.employeeRepository.updateEmployeeAddress(id, newData);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new NoAddressException();
      }

      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
  }

  public employeeLogin = async (email: string, password: string) => {
    const employeeDetails = await this.employeeRepository.getEmployeeByEmail(
      email
    );

    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }

    const validPassword = await compare(password, employeeDetails.password);

    if (validPassword) {
      let payload = {
        'custom:id': employeeDetails.id,
        'custom:name': employeeDetails.name,
        'custom:role': employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

  private generateAuthTokens = (payload: any) => {
    return sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}
