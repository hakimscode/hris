import { getModelToken } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { roles } from '../app.roles';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: UserSchema },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
