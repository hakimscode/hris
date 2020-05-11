import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBonusDto {
  @IsString()
  @IsNotEmpty()
  readonly bonusName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly decimalUnit: boolean;
}
