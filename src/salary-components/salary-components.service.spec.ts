// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { SalaryComponentsService } from './salary-components.service';

describe('SalaryComponentsService', () => {
  let service: SalaryComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryComponentsService]
    }).compile();

    service = module.get<SalaryComponentsService>(SalaryComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
