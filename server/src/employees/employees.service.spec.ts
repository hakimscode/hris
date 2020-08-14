import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmployeesService } from './employees.service';
import { EmployeeSchema } from './schemas/employee.schema';
import { UserSchema } from '../users/schemas/user.schema';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: getModelToken('Employee'), useValue: EmployeeSchema },
        { provide: getModelToken('User'), useValue: UserSchema },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
