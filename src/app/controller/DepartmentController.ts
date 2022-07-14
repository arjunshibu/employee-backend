import { NextFunction, Response } from 'express';
import APP_CONSTANTS from '../constants';
import { DepartmentDto } from '../dto/DepartmentDto';
import { employeeRole } from '../entities/Employee';
import authorize from '../middleware/AuthorizationMiddleware';
import validationMiddleware from '../middleware/ValidationMiddleware';
import DepartmentService from '../service/DepartmentService';
import { AbstractController } from '../util/rest/controller';
import RequestWithUser from '../util/rest/request';

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      // Comment below line to disable authorization temporarily when using
      // this endpoint for the first time for creating the 'HR' department
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      validationMiddleware(DepartmentDto, APP_CONSTANTS.body),
      this.createDepartment
    );
    this.router.get(
      `${this.path}`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.getAllDepartments
    );
    this.router.get(
      `${this.path}/:id`,
      authorize([
        employeeRole.ADMIN,
        employeeRole.HR,
        employeeRole.MANAGER,
        employeeRole.ENGINEER,
      ]),
      this.getDepartment
    );
    this.router.delete(
      `${this.path}/:id`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.deleteDepartment
    );
    this.router.put(
      `${this.path}/:id`,
      authorize([employeeRole.ADMIN, employeeRole.HR]),
      this.updateDepartment
    );
  }

  private getAllDepartments = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.departmentService.getAllDepartments();
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK')
      );
    } catch (error) {
      return next(error);
    }
  };

  private getDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.departmentService.getDepartment(
        request.params.id
      );
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK')
      );
    } catch (error) {
      return next(error);
    }
  };

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = request.body;

      response.status(201);
      const result = await this.departmentService.createDepartment(name);
      response.send(
        this.fmt.formatResponse(result, Date.now() - request.startTime, 'OK')
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      await this.departmentService.deleteDepartment(request.params.id);
      response.send(
        response.send(
          this.fmt.formatResponse(null, Date.now() - request.startTime, 'OK', 1)
        )
      );
    } catch (error) {
      return next(error);
    }
  };

  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.status(200);
      const result = await this.departmentService.updateDepartment(
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
}

export default DepartmentController;
