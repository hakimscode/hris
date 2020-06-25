import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { SalaryComponent } from './interfaces/salary-component.interface';
import { CreateSalaryComponentDto } from './dtos/create-salary-component-dto';
import { UpdateSalaryComponentDto } from './dtos/update-salary-component-dto';
export declare class SalaryComponentsService {
    private readonly SalaryComponentModel;
    constructor(SalaryComponentModel: Model<SalaryComponent>);
    getSalaryComponents(): Promise<ResponseDto>;
    createSalaryComponent(createSalaryComponentDto: CreateSalaryComponentDto): Promise<ResponseDto>;
    getSalaryComponent(SalaryComponentId: string): Promise<ResponseDto>;
    updateSalaryComponent(SalaryComponentId: string, updateSalaryComponentDto: UpdateSalaryComponentDto): Promise<ResponseDto>;
    deleteSalaryComponent(salaryComponentId: string): Promise<ResponseDto>;
}
