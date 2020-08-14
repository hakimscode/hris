// eslint-disable-next-line import/no-extraneous-dependencies
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SalaryComponentsService } from './salary-components.service';
import { SalaryComponentSchema } from './schemas/salary-component.schema';

describe('SalaryComponentsService', () => {
  let service: SalaryComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryComponentsService,
        {
          provide: getModelToken('SalaryComponents'),
          useValue: SalaryComponentSchema,
        },
      ],
    }).compile();

    service = module.get<SalaryComponentsService>(SalaryComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
