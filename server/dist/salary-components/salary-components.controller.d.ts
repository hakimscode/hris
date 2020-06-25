import { SalaryComponentsService } from './salary-components.service';
import { CreateSalaryComponentDto } from './dtos/create-salary-component-dto';
import { UpdateSalaryComponentDto } from './dtos/update-salary-component-dto';
export declare class SalaryComponentsController {
    private readonly SalaryComponentsServices;
    constructor(SalaryComponentsServices: SalaryComponentsService);
    getSalaryComponents(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    createSalaryComponent(createSalaryComponentDto: CreateSalaryComponentDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    getSalaryComponent(SalaryComponentId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
    updateSalaryComponent(SalaryComponentId: string, updateSalaryComponentDto: UpdateSalaryComponentDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    deleteSalaryComponent(SalaryComponentId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
