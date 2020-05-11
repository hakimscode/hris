import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateBonusDto {
  @IsString()
  readonly bonusName: string;

  @IsNumber()
  readonly amount: number;

  @IsBoolean()
  readonly decimalUnit: boolean;
}
