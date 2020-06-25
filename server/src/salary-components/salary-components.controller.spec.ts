// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { SalaryComponentsController } from './salary-components.controller';

describe('SalaryComponents Controller', () => {
  let controller: SalaryComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryComponentsController]
    }).compile();

    controller = module.get<SalaryComponentsController>(
      SalaryComponentsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
