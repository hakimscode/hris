import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { EmployeesController } from './employees.controller';
import { roles } from '../app.roles';
import { EmployeesService } from './employees.service';
import { EmployeeSchema } from './schemas/employee.schema';
import { UserSchema } from '../users/schemas/user.schema';

describe('Employees Controller', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        { provide: getModelToken('Employee'), useValue: EmployeeSchema },
        { provide: getModelToken('User'), useValue: UserSchema },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
