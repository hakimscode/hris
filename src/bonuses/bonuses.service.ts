/* eslint-disable no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bonus } from './interfaces/bonus.interface';
import { CreateBonusDto } from './dtos/create-bonus-dto';
import { UpdateBonusDto } from './dtos/update-bonus-dto';

@Injectable()
export class BonusesService {
  constructor(
    @InjectModel('Bonus') private readonly BonusModel: Model<Bonus>
  ) {}

  async getBonuses(): Promise<Bonus[]> {
    const bonuses = await this.BonusModel.find().exec();
    return bonuses;
  }

  async createBonus(createBonusDto: CreateBonusDto): Promise<Bonus> {
    return new this.BonusModel(createBonusDto).save();
  }

  async getBonus(bonusId: string): Promise<Bonus> {
    const bonus = await this.BonusModel.findById(bonusId).exec();
    return bonus;
  }

  async updateBonus(
    bonusId: string,
    updateBonusDto: UpdateBonusDto
  ): Promise<Bonus> {
    const updatedBonus = await this.BonusModel.findByIdAndUpdate(
      bonusId,
      updateBonusDto,
      { new: true }
    );
    return updatedBonus;
  }

  async deleteBonus(bonusId: string) {
    const deletedBonus = await this.BonusModel.findByIdAndRemove(bonusId);
    return deletedBonus;
  }
}
