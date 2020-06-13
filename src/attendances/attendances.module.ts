import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendancesService } from './attendances.service';
import { AttendanceSchema } from './schemas/attendance.schema';
import { AttendancesController } from './attendances.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attendance', schema: AttendanceSchema }
    ])
  ],
  providers: [AttendancesService],
  controllers: [AttendancesController]
})
export class AttendancesModule {}
