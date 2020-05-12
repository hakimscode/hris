/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Bonus } from './interfaces/bonus.interface';
import { CreateBonusDto } from './dtos/create-bonus-dto';
import { UpdateBonusDto } from './dtos/update-bonus-dto';

@Injectable()
export class BonusesService {
  constructor(
    @InjectModel('Bonus') private readonly BonusModel: Model<Bonus>
  ) {}

  async getBonuses(): Promise<ResponseDto> {
    const bonuses: Bonus[] = await this.BonusModel.find().exec();

    if (!bonuses.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Bonus does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Bonuses Found', bonuses);
  }

  async createBonus(createBonusDto: CreateBonusDto): Promise<ResponseDto> {
    const newBonus: Bonus = new this.BonusModel(createBonusDto);
    await newBonus.save();
    return new ResponseDto(
      HttpStatus.CREATED,
      'Bonus has been submitted successfully',
      newBonus
    );
  }

  async getBonus(bonusId: string): Promise<ResponseDto> {
    const bonus: Bonus = await this.BonusModel.findById(bonusId).exec();

    if (!bonus) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Bonus does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Bonus Found', bonus);
  }

  async updateBonus(
    bonusId: string,
    updateBonusDto: UpdateBonusDto
  ): Promise<ResponseDto> {
    const updatedBonus: Bonus = await this.BonusModel.findByIdAndUpdate(
      bonusId,
      updateBonusDto,
      { new: true }
    );

    if (!updatedBonus) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Bonus does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.ACCEPTED,
      'Bonus has been updated successfully',
      updatedBonus
    );
  }

  async deleteBonus(bonusId: string) {
    const deletedBonus: Bonus = await this.BonusModel.findByIdAndRemove(
      bonusId
    );

    if (!deletedBonus) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Bonus does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Bonus has been deleted successfully'
    );
  }
}
