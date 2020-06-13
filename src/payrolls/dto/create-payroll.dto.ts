import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreatePayrollDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @IsNotEmpty()
  benefitSalary: Array<Object>;

  @IsArray()
  @IsNotEmpty()
  cutSalary: Array<Object>;
}
