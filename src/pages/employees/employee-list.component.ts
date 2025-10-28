import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);

  employees = toSignal(this.employeeService.getEmployees(), { initialValue: [] });

  // Pagination state
  currentPage = signal(1);
  itemsPerPage = signal(10);
  
  // Delete confirmation modal state
  showDeleteModal = signal(false);
  employeeToDelete = signal<Employee | null>(null);

  paginatedEmployees = computed(() => {
    const allEmployees = this.employees();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return allEmployees.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.employees().length / this.itemsPerPage());
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(id: string) {
    this.router.navigate(['/edit-employee', id]);
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee-detail', id]);
  }
  
  confirmDelete(employee: Employee) {
    this.employeeToDelete.set(employee);
    this.showDeleteModal.set(true);
  }
  
  deleteEmployee() {
    if (this.employeeToDelete()) {
      this.employeeService.deleteEmployee(this.employeeToDelete()!.id);
      this.cancelDelete();
    }
  }
  
  cancelDelete() {
    this.showDeleteModal.set(false);
    this.employeeToDelete.set(null);
  }
}
