import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { EmployeesService } from './employees.service';
import { EmployeeSchema } from './schemas/employee.schema';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Employee', schema: EmployeeSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
