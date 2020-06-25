import { PayrollsService } from './payrolls.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
export declare class PayrollsController {
    private readonly payrollService;
    constructor(payrollService: PayrollsService);
    getPayrolls(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    createPayroll(createPayrollDto: CreatePayrollDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
