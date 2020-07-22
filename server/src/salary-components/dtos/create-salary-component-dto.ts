import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsEnum
} from 'class-validator';
import { SalaryComponentEnum } from '../../shared/enums';

export class CreateSalaryComponentDto {
  @IsString()
  @IsNotEmpty()
  readonly componentName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SalaryComponentEnum)
  readonly componentType: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly decimalUnit: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly isAdders: boolean;
}
