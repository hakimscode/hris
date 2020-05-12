import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BonusesService } from './bonuses.service';
import { CreateBonusDto } from './dtos/create-bonus-dto';
import { UpdateBonusDto } from './dtos/update-bonus-dto';

@Controller('bonuses')
export class BonusesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly bonusServices: BonusesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getBonuses() {
    return this.bonusServices.getBonuses();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBonus(@Body() createBonusDto: CreateBonusDto) {
    return this.bonusServices.createBonus(createBonusDto);
  }

  @Get(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  async getBonus(@Param('bonusId') bonusId: string) {
    return this.bonusServices.getBonus(bonusId);
  }

  @Patch(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(202)
  async updateBonus(
    @Param('bonusId') bonusId: string,
    @Body() updateBonusDto: UpdateBonusDto
  ) {
    return this.bonusServices.updateBonus(bonusId, updateBonusDto);
  }

  @Delete(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  async deleteBonus(@Param('bonusId') bonusId: string) {
    return this.bonusServices.deleteBonus(bonusId);
  }
}
