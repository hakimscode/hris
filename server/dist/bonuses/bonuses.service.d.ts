import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Bonus } from './interfaces/bonus.interface';
import { CreateBonusDto } from './dtos/create-bonus-dto';
import { UpdateBonusDto } from './dtos/update-bonus-dto';
export declare class BonusesService {
    private readonly BonusModel;
    constructor(BonusModel: Model<Bonus>);
    getBonuses(): Promise<ResponseDto>;
    createBonus(createBonusDto: CreateBonusDto): Promise<ResponseDto>;
    getBonus(bonusId: string): Promise<ResponseDto>;
    updateBonus(bonusId: string, updateBonusDto: UpdateBonusDto): Promise<ResponseDto>;
    deleteBonus(bonusId: string): Promise<ResponseDto>;
}
