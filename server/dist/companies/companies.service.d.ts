import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private readonly CompanyModel;
    constructor(CompanyModel: Model<Company>);
    getCompanies(): Promise<ResponseDto>;
    addCompany(createCompanyDto: CreateCompanyDto): Promise<ResponseDto>;
    getCompany(companyId: string): Promise<ResponseDto>;
    updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto): Promise<ResponseDto>;
    deleteCompany(companyId: string): Promise<ResponseDto>;
}
