import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN_ROLE = "Admin",
    EMPLOYEE_ROLE = "Employee"
}
export declare const roles: RolesBuilder;
