import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryComponentsService } from './salary-components.service';
import { SalaryComponentSchema } from './schemas/salary-component.schema';
import { SalaryComponentsController } from './salary-components.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SalaryComponents', schema: SalaryComponentSchema }
    ])
  ],
  providers: [SalaryComponentsService],
  controllers: [SalaryComponentsController]
})
export class SalaryComponentsModule {}
