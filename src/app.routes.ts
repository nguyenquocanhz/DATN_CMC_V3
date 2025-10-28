import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './pages/employees/employee-list.component';
import { EmployeeDetailComponent } from './pages/employees/employee-detail.component';
import { EmployeeFormComponent } from './pages/employees/employee-form.component';
import { PayrollListComponent } from './pages/payroll/payroll-list.component';
import { authGuard } from './services/auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'employee-detail/:id', component: EmployeeDetailComponent },
      { path: 'add-employee', component: EmployeeFormComponent },
      { path: 'edit-employee/:id', component: EmployeeFormComponent },
      { path: 'payroll-list', component: PayrollListComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }
];
