import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

const DB_HOST_HRIS =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://localhost:27017/hris'
    : process.env.DB_HOST_HRIS;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccessControlModule.forRoles(roles),
    MongooseModule.forRoot(DB_HOST_HRIS, {
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
