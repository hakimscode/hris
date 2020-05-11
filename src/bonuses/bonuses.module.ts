import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BonusesService } from './bonuses.service';
import { BonusSchema } from './schemas/bonus.schema';
import { BonusesController } from './bonuses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bonus', schema: BonusSchema }])
  ],
  providers: [BonusesService],
  controllers: [BonusesController]
})
export class BonusesModule {}
