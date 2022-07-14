import { IsString } from 'class-validator';

export class DepartmentDto {
  @IsString()
  public name: string;
}
