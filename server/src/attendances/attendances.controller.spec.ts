import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessControlModule } from 'nest-access-control';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';
import { AttendanceSchema } from './schemas/attendance.schema';
import { roles } from '../app.roles';

describe('Attendances Controller', () => {
  let controller: AttendancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [AttendancesController],
      providers: [
        AttendancesService,
        {
          provide: getModelToken('Attendance'),
          useValue: AttendanceSchema,
        },
      ],
    }).compile();

    controller = module.get<AttendancesController>(AttendancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
