import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalaryComponentsModule } from './salary-components/salary-components.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:4040/hris', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    CompaniesModule,
    AuthModule,
    UsersModule,
    SalaryComponentsModule,
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
