import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollsService } from './payrolls.service';
import { PayrollsSchema } from './schemas/payrolls.schema';
import { PayrollsController } from './payrolls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Payroll', schema: PayrollsSchema }])
  ],
  providers: [PayrollsService],
  controllers: [PayrollsController]
})
export class PayrollsModule {}
