import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalaryComponentsModule } from './salary-components/salary-components.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendancesModule } from './attendances/attendances.module';
import { PayrollsModule } from './payrolls/payrolls.module';
import { roles } from './app.roles';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    MongooseModule.forRoot('mongodb://localhost:27017/hris', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    CompaniesModule,
    AuthModule,
    UsersModule,
    SalaryComponentsModule,
    EmployeesModule,
    AttendancesModule,
    PayrollsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
