import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateSalaryComponentDto {
  @IsString()
  readonly componentName: string;

  @IsString()
  readonly componentType: string;

  @IsNumber()
  readonly amount: number;

  @IsBoolean()
  readonly decimalUnit: boolean;

  @IsBoolean()
  readonly isAdders: boolean;
}
