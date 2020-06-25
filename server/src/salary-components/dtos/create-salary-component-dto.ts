import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateSalaryComponentDto {
  @IsString()
  @IsNotEmpty()
  readonly componentName: string;

  @IsString()
  @IsNotEmpty()
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
