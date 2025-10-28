import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';

interface PayrollEntry extends Employee {
  checkIn: string;
  checkOut: string;
  workHours: string;
  date: string;
  attendanceStatus: 'Chấm công' | 'Nghỉ' | 'Vắng mặt';
}

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class PayrollListComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);

  employees = toSignal(this.employeeService.getEmployees(), { initialValue: [] });

  payrollData = computed<PayrollEntry[]>(() => {
    return this.employees().map(emp => ({
      ...emp,
      checkIn: '09:00 (GMT +7)',
      checkOut: '17:30 (GMT +7)',
      workHours: '7h',
      date: 'XX-XX-XXXX',
      attendanceStatus: emp.status === 'On Leave' ? 'Nghỉ' : 'Chấm công'
    }));
  });

  // Pagination state
  currentPage = signal(1);
  itemsPerPage = signal(10);

  paginatedData = computed(() => {
    const data = this.payrollData();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return data.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.payrollData().length / this.itemsPerPage());
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
