import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class EmployeeDetailComponent {
  route = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);

  employee = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this.employeeService.getEmployeeById(id) : of(undefined);
      }),
      filter((employee): employee is Employee => !!employee)
    )
  );
  
  calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  hoursLogged = [
    { day: 'M', hours: 8 }, { day: 'T', hours: 7.5 }, { day: 'W', hours: 4 }, 
    { day: 'T', hours: 8 }, { day: 'F', hours: 7 }, { day: 'S', hours: 0 }, { day: 'S', hours: 0 }
  ];
  documents = [
    { name: 'Performance Evaluation.pdf', size: '1.24 MB' },
    { name: 'Contract Agreement.pdf', size: '895 KB' },
    { name: 'Curriculum Vitae.pdf', size: '1.27 MB' },
    { name: 'Portfolio.pdf', size: '3.68 MB' },
  ];
  
  getMaxHours(): number {
    return Math.max(...this.hoursLogged.map(h => h.hours), 8);
  }
}
