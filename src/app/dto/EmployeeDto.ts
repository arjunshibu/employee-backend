import { IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;

  @IsString()
  public departmentId: string;
}
