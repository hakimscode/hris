import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesService } from './companies.service';
import { CompanySchema } from './schemas/company.schema';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
