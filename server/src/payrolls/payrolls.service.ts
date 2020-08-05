/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Payroll } from './interfaces/payrolls.interface';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Injectable()
export class PayrollsService {
  constructor(
    @InjectModel('Payroll') private readonly PayrollModel: Model<Payroll>
  ) {}

  async getPayrolls(user: any): Promise<ResponseDto> {
    const { company } = user;
    const qryCompany = company ? { company } : null;
    const payrolls: Payroll[] = await this.PayrollModel.find(qryCompany)
      .populate({
        path: 'employee',
        select: ['profile.name', 'position.department'],
        populate: { path: 'company', select: 'name' }
      })
      .exec();

    if (!payrolls.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Payroll does not exist'
      );

      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Payrolls Found', payrolls);
  }

  async getPayroll(payrollId): Promise<ResponseDto> {
    const payroll: Payroll = await this.PayrollModel.findById(payrollId)
      .populate({
        path: 'employee',
        select: ['profile.name', 'position.department', 'position.role'],
        populate: { path: 'company', select: 'name' }
      })
      .exec();

    if (!payroll) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Payroll does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Payroll Found', payroll);
  }

  async createPayroll(
    createPayrollDto: CreatePayrollDto
  ): Promise<ResponseDto> {
    const newPayroll: Payroll = new this.PayrollModel(createPayrollDto);
    await newPayroll.save();

    return new ResponseDto(
      HttpStatus.CREATED,
      'Payroll has been submitted successfuuly'
    );
  }
}
