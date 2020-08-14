// eslint-disable-next-line import/no-extraneous-dependencies
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessControlModule } from 'nest-access-control';
import { SalaryComponentsController } from './salary-components.controller';
import { SalaryComponentsService } from './salary-components.service';
import { roles } from '../app.roles';
import { SalaryComponentSchema } from './schemas/salary-component.schema';

describe('SalaryComponents Controller', () => {
  let controller: SalaryComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [SalaryComponentsController],
      providers: [
        SalaryComponentsService,
        {
          provide: getModelToken('SalaryComponents'),
          useValue: SalaryComponentSchema,
        },
      ],
    }).compile();

    controller = module.get<SalaryComponentsController>(
      SalaryComponentsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
