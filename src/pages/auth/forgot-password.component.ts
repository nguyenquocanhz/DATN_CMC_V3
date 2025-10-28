import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() { return this.forgotPasswordForm.get('email'); }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Password reset link sent to:', this.forgotPasswordForm.value.email);
      this.submitted = true;
    }
  }
}
