import { Test, TestingModule } from '@nestjs/testing';
import { PayrollsService } from './payrolls.service';
import { getModelToken } from '@nestjs/mongoose';
import { PayrollsSchema } from './schemas/payrolls.schema';

describe('PayrollsService', () => {
  let service: PayrollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollsService,
        { provide: getModelToken('Payroll'), useValue: PayrollsSchema },
      ],
    }).compile();

    service = module.get<PayrollsService>(PayrollsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
