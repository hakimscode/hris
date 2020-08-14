import { getModelToken } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { Test, TestingModule } from '@nestjs/testing';
import { PayrollsController } from './payrolls.controller';
import { roles } from '../app.roles';
import { PayrollsService } from './payrolls.service';
import { PayrollsSchema } from './schemas/payrolls.schema';

describe('Payrolls Controller', () => {
  let controller: PayrollsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [PayrollsController],
      providers: [
        PayrollsService,
        { provide: getModelToken('Payroll'), useValue: PayrollsSchema },
      ],
    }).compile();

    controller = module.get<PayrollsController>(PayrollsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
