import { IsString, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  companyId: string;

  @IsString()
  idCardNumber: string;

  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsString()
  placeOfBirth: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  maritalStatus: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsString()
  department: string;

  @IsString()
  role: string;

  @IsNumber()
  primarySalary: number;

  @IsNumber()
  dailyAllowance: number;

  @IsString()
  address: string;
}
