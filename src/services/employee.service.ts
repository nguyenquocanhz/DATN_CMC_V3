import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    { id: '1', name: 'Mia Torres', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Frontend Developer', department: 'Engineering', employeeId: 'FE-2348', joinDate: '2025-04-05', email: 'mia.torres@company.com', phone: '+62 812-3456-7890', status: 'Active', employeeType: 'Full-Time', workLocation: 'On-Site', gender: 'Female', birthDate: '1993-03-28', address: 'Jl. Melati No. 45, Sleman, Yogyakarta, Indonesia', performance: 95, salary: 5000, attendance: [] },
    { id: '2', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Backend Developer', department: 'Engineering', employeeId: 'BE-1982', joinDate: '2024-11-10', email: 'john.smith@company.com', phone: '+1 234-567-8901', status: 'Active', employeeType: 'Full-Time', workLocation: 'Remote', gender: 'Male', birthDate: '1990-07-15', address: '123 Main St, Anytown, USA', performance: 88, salary: 5200, attendance: [] },
    { id: '3', name: 'Alisha Chin', avatar: 'https://i.pravatar.cc/150?u=3', role: 'UI/UX Designer', department: 'Design', employeeId: 'UX-5241', joinDate: '2025-01-20', email: 'alisha.chin@company.com', phone: '+91 98765 43210', status: 'On Leave', employeeType: 'Freelance', workLocation: 'Remote', gender: 'Female', birthDate: '1995-11-02', address: '456 Park Ave, Mumbai, India', performance: 92, salary: 4500, attendance: [] },
    { id: '4', name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Project Manager', department: 'Management', employeeId: 'PM-0023', joinDate: '2023-08-15', email: 'david.chen@company.com', phone: '+1 415-555-1234', status: 'Active', employeeType: 'Full-Time', workLocation: 'On-Site', gender: 'Male', birthDate: '1988-05-22', address: '789 Market St, San Francisco, USA', performance: 97, salary: 7000, attendance: [] },
    { id: '5', name: 'Emily White', avatar: 'https://i.pravatar.cc/150?u=5', role: 'HR Specialist', department: 'Human Resources', employeeId: 'HR-1101', joinDate: '2024-09-01', email: 'emily.white@company.com', phone: '+44 20 7946 0958', status: 'Active', employeeType: 'Part-Time', workLocation: 'On-Site', gender: 'Female', birthDate: '1992-12-30', address: '10 Downing St, London, UK', performance: 90, salary: 3000, attendance: [] },
    { id: '6', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?u=6', role: 'DevOps Engineer', department: 'Engineering', employeeId: 'DO-3456', joinDate: '2025-02-18', email: 'michael.brown@company.com', phone: '+61 2 9876 5432', status: 'Active', employeeType: 'Full-Time', workLocation: 'Remote', gender: 'Male', birthDate: '1991-09-12', address: '200 George St, Sydney, Australia', performance: 94, salary: 5500, attendance: [] },
    { id: '7', name: 'Sophia Lee', avatar: 'https://i.pravatar.cc/150?u=7', role: 'Data Scientist', department: 'Data Science', employeeId: 'DS-7890', joinDate: '2023-12-05', email: 'sophia.lee@company.com', phone: '+82 10-1234-5678', status: 'Terminated', employeeType: 'Full-Time', workLocation: 'On-Site', gender: 'Female', birthDate: '1994-01-25', address: '150 Sejong-daero, Seoul, South Korea', performance: 85, salary: 6000, attendance: [] },
    { id: '8', name: 'Daniel Garcia', avatar: 'https://i.pravatar.cc/150?u=8', role: 'Marketing Intern', department: 'Marketing', employeeId: 'MI-2025', joinDate: '2025-06-01', email: 'daniel.garcia@company.com', phone: '+34 912 345 678', status: 'Active', employeeType: 'Internship', workLocation: 'On-Site', gender: 'Male', birthDate: '2002-04-10', address: 'Calle de Alcalá, 20, Madrid, Spain', performance: 89, salary: 1500, attendance: [] },
  ];
  
  employeesSignal = signal<Employee[]>(this.employees);

  getEmployees() {
    return of(this.employeesSignal());
  }

  getEmployeeById(id: string) {
    const employee = this.employeesSignal().find(e => e.id === id);
    return of(employee);
  }

  addEmployee(employee: Omit<Employee, 'id'>) {
    const newEmployee: Employee = {
      ...employee,
      id: (this.employeesSignal().length + 1).toString(),
    };
    this.employeesSignal.update(employees => [...employees, newEmployee]);
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employeesSignal.update(employees => 
      employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e)
    );
  }

  deleteEmployee(id: string) {
    this.employeesSignal.update(employees => employees.filter(e => e.id !== id));
  }
}
