import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessControlModule } from 'nest-access-control';
import { CompaniesController } from './companies.controller';
import { roles } from '../app.roles';
import { CompaniesService } from './companies.service';
import { CompanySchema } from './schemas/company.schema';

describe('Companies Controller', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        { provide: getModelToken('Company'), useValue: CompanySchema },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
