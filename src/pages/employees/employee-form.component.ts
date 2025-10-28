import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeeFormComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);

  currentStep = signal(1);
  employeeForm: FormGroup;
  isEditMode = signal(false);
  employeeId = signal<string | null>(null);

  constructor() {
    this.employeeForm = this.fb.group({
      // Step 1: Personal Info
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        gender: ['Male', Validators.required],
        birthDate: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required]
      }),
      // Step 2: Employee & Salary Info
      employeeInfo: this.fb.group({
        employeeId: ['', Validators.required],
        joinDate: ['', Validators.required],
        company: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        workType: ['Full-Time', Validators.required],
        insurance: [true],
        training: [false],
        documents: [''],
        baseSalary: [0, [Validators.required, Validators.min(0)]],
        accountNumber: ['', Validators.required]
      }),
      // Step 3: Face registration (not part of form data)
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.employeeId.set(id);
      this.employeeService.getEmployeeById(id).pipe(take(1)).subscribe(employee => {
        if (employee) {
          this.patchForm(employee);
        }
      });
    }
  }

  patchForm(employee: Employee) {
    this.employeeForm.patchValue({
      personalInfo: {
        fullName: employee.name,
        gender: employee.gender,
        birthDate: employee.birthDate,
        email: employee.email,
        phone: employee.phone,
        address: employee.address
      },
      employeeInfo: {
        employeeId: employee.employeeId,
        joinDate: employee.joinDate,
        company: 'CMC Uni', // Mock data
        department: employee.department,
        jobTitle: employee.role,
        workType: employee.employeeType,
        baseSalary: employee.salary,
        accountNumber: '123456789' // Mock data
      }
    });
  }

  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }
  
  cancel() {
      this.router.navigate(['/employee-list']);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.getRawValue();
      const employeeData = {
        name: formValue.personalInfo.fullName,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
        role: formValue.employeeInfo.jobTitle,
        department: formValue.employeeInfo.department,
        employeeId: formValue.employeeInfo.employeeId,
        joinDate: formValue.employeeInfo.joinDate,
        email: formValue.personalInfo.email,
        phone: formValue.personalInfo.phone,
        status: 'Active' as const,
        employeeType: formValue.employeeInfo.workType as any,
        workLocation: 'On-Site' as const,
        gender: formValue.personalInfo.gender as any,
        birthDate: formValue.personalInfo.birthDate,
        address: formValue.personalInfo.address,
        performance: 90, // default
        salary: formValue.employeeInfo.baseSalary,
        attendance: []
      };

      if (this.isEditMode() && this.employeeId()) {
        const updatedEmployee = { ...employeeData, id: this.employeeId()! };
        this.employeeService.updateEmployee(updatedEmployee);
      } else {
        this.employeeService.addEmployee(employeeData);
      }
      this.router.navigate(['/employee-list']);
    }
  }
}
