import { BonusesService } from './bonuses.service';
import { CreateBonusDto } from './dtos/create-bonus-dto';
import { UpdateBonusDto } from './dtos/update-bonus-dto';
export declare class BonusesController {
    private readonly bonusServices;
    constructor(bonusServices: BonusesService);
    getBonuses(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    createBonus(createBonusDto: CreateBonusDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    getBonus(bonusId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
    updateBonus(bonusId: string, updateBonusDto: UpdateBonusDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    deleteBonus(bonusId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
