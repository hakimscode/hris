import { Document } from 'mongoose';

export interface Attendance extends Document {
  readonly dateOfAttendance: string;
  readonly bodyOfAttendances: [
    {
      employeeId: string;
      timeIn: string;
      timeOut: string;
      note: string;
    }
  ];
}
