/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from './HealthController';
import EmployeeController from './EmployeeController';
import EmployeeService from '../service/EmployeeService';
import DepartmentService from '../service/DepartmentService';
import EmployeeRepository from '../repositories/EmployeeRepository';
import DepartmentController from './DepartmentController';
import DepartmentRepository from '../repositories/DepartmentRepository';

export default [
  new HealthController(),
  new DepartmentController(new DepartmentService(new DepartmentRepository())),
  new EmployeeController(new EmployeeService(new EmployeeRepository())),
];
