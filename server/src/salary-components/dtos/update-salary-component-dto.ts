import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional
} from 'class-validator';
import { SalaryComponentEnum } from '../../shared/enums';

export class UpdateSalaryComponentDto {
  @IsString()
  @IsOptional()
  readonly componentName: string;

  @IsString()
  @IsEnum(SalaryComponentEnum)
  @IsOptional()
  readonly componentType: string;

  @IsNumber()
  @IsOptional()
  readonly amount: number;

  @IsBoolean()
  @IsOptional()
  readonly decimalUnit: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isAdders: boolean;
}
