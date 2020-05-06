import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:4040/hris', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
