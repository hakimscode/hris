import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
  Patch,
  Delete
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
  async getBonuses(@Res() res) {
    const bonuses = await this.bonusServices.getBonuses();
    return res.status(HttpStatus.OK).json(bonuses);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBonus(@Res() res, @Body() createBonusDto: CreateBonusDto) {
    const newBonus = await this.bonusServices.createBonus(createBonusDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Bonus has been submitted successfully',
      bonus: newBonus
    });
  }

  @Get(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  async getBonus(@Res() res, @Param('bonusId') bonusId: string) {
    const bonus = await this.bonusServices.getBonus(bonusId);
    return res.status(HttpStatus.OK).json(bonus);
  }

  @Patch(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  async updateBonus(
    @Res() res,
    @Param('bonusId') bonusId: string,
    @Body() updateBonusDto: UpdateBonusDto
  ) {
    const updatedBonus = await this.bonusServices.updateBonus(
      bonusId,
      updateBonusDto
    );
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Bonus has been updated successfully',
      bonus: updatedBonus
    });
  }

  @Delete(':bonusId')
  @UseGuards(AuthGuard('jwt'))
  async deleteBonus(@Res() res, @Param('bonusId') bonusId: string) {
    const deletedBonus = await this.bonusServices.deleteBonus(bonusId);
    return res.status(HttpStatus.OK).json({
      message: 'Bonus has been deleted successfully',
      bonus: deletedBonus
    });
  }
}
