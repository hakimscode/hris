import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN_ROLE = 'Admin',
  ADMIN_COMPANY_ROLE = 'Admin Company',
  EMPLOYEE_ROLE = 'Employee'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN_ROLE)
  .createAny(['employee', 'salaryComponent', 'payroll', 'company', 'user'])
  .updateAny(['employee', 'salaryComponent', 'payroll', 'company'])
  .readAny(['employee', 'salaryComponent', 'payroll', 'company', 'attendance'])
  .deleteAny([
    'employee',
    'salaryComponent',
    'payroll',
    'company',
    'attendance'
  ]);

roles
  .grant(AppRoles.ADMIN_COMPANY_ROLE)
  .createOwn(['employee', 'salaryComponent', 'payroll', 'company'])
  .updateOwn(['employee', 'salaryComponent', 'payroll', 'company'])
  .readOwn(['employee', 'salaryComponent', 'payroll', 'company', 'attendance'])
  .deleteOwn([
    'employee',
    'salaryComponent',
    'payroll',
    'company',
    'attendance'
  ]);

roles
  .grant(AppRoles.EMPLOYEE_ROLE)
  .createOwn(['attendance'])
  .updateOwn(['employee'])
  .readOwn('attendance', 'payroll');
