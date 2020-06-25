import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getUser(username: string): Promise<User>;
}
