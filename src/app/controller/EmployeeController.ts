import { NextFunction, Response } from 'express';
import APP_CONSTANTS from '../constants';
import { AddressDto } from '../dto/AddressDto';
import { EmployeeDto } from '../dto/EmployeeDto';
import { employeeRole } from '../entities/Employee';
import EntityNotFoundException from '../exception/EntityNotFoundException';
import authorize from '../middleware/AuthorizationMiddleware';
import validationMiddleware from '../middleware/ValidationMiddleware';
import EmployeeService from '../service/EmployeeService';
import { ErrorCodes } from '../util/errorCode';
import { AbstractController } from '../util/rest/controller';
import RequestWithUser from '../util/rest/request';

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      // Comment below line to disable authorization temporarily when using
      // this endpoint for the first time for creating the 'admin' or 'hr' user
      // authorize([employeeRole.ADMIN, employeeRole.HR]),
      validationMiddleware(EmployeeDto, APP_CONSTANTS.body),
      this.createEmployee
    );
    this.router.get(
      `${this.path}`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.getAllEmployees
    );
    this.router.get(
      `${this.path}/:id`,
      authorize([
        employeeRole.ADMIN,
        employeeRole.HR,
        employeeRole.MANAGER,
        employeeRole.ENGINEER,
      ]),
      this.getEmployee
    );
    this.router.delete(
      `${this.path}/:id`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.deleteEmployee
    );
    this.router.put(
      `${this.path}/:id`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.updateEmployee
    );
    this.router.post(
      `${this.path}/:id/address`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      validationMiddleware(AddressDto, APP_CONSTANTS.body),
      this.createEmployeeAddress
    );
    this.router.delete(
      `${this.path}/:id/address`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.deleteEmployeeAddress
    );
    this.router.put(
      `${this.path}/:id/address`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      validationMiddleware(AddressDto, APP_CONSTANTS.body),
      this.updateEmployeeAddress
    );
    this.router.post(`${this.path}/login`, this.login);
  }

  private getAllEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.employeeService.getAllEmployees();
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);

      const employee = await this.employeeService.getEmployee(
        request.params.id
      );

      if (!employee) {
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }

      response.send(
        this.fmt.formatResponse(
          employee,
          Date.now() - request.startTime,
          'OK',
          1
        )
      );
    } catch (error) {
      return next(error);
    }
  };

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(201);
      const result = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);

      await this.employeeService.deleteEmployee(request.params.id);

      response.send(
        this.fmt.formatResponse(null, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.employeeService.updateEmployee(
        request.params.id,
        request.body
      );
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private createEmployeeAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.employeeService.createEmployeeAddress(
        request.params.id,
        request.body
      );
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteEmployeeAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.employeeService.deleteEmployeeAddress(
        request.params.id
      );
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private updateEmployeeAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.employeeService.updateEmployeeAddress(
        request.params.id,
        request.body
      );
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK', 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const loginData = request.body;
      const loginDetail = await this.employeeService.employeeLogin(
        loginData.email.toLowerCase(),
        loginData.password
      );

      response.send(
        this.fmt.formatResponse(
          loginDetail,
          Date.now() - request.startTime,
          'OK'
        )
      );
    } catch (error) {
      return next(error);
    }
  };
}

export default EmployeeController;
