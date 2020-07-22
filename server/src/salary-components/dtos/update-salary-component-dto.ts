import { IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { SalaryComponentEnum } from '../../shared/enums';

export class UpdateSalaryComponentDto {
  @IsString()
  readonly componentName: string;

  @IsString()
  @IsEnum(SalaryComponentEnum)
  readonly componentType: string;

  @IsNumber()
  readonly amount: number;

  @IsBoolean()
  readonly decimalUnit: boolean;

  @IsBoolean()
  readonly isAdders: boolean;
}
