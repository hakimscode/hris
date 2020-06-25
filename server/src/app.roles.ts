import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN_ROLE = 'Admin',
  EMPLOYEE_ROLE = 'Employee'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN_ROLE)
  .createAny(['employee', 'salaryComponent', 'payroll', 'company'])
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
  .grant(AppRoles.EMPLOYEE_ROLE)
  .createOwn(['attendance'])
  .updateOwn(['employee'])
  .readOwn('attendance', 'payroll');
