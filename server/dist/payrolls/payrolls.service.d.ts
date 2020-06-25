import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Payroll } from './interfaces/payrolls.interface';
import { CreatePayrollDto } from './dto/create-payroll.dto';
export declare class PayrollsService {
    private readonly PayrollModel;
    constructor(PayrollModel: Model<Payroll>);
    getPayrolls(): Promise<ResponseDto>;
    createPayroll(createPayrollDto: CreatePayrollDto): Promise<ResponseDto>;
}
