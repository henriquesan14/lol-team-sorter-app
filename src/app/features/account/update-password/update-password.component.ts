import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidators } from '../../../shared/validators/confirm-password.validator';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {
      private fb = inject(NonNullableFormBuilder);
      private accountService = inject(AccountService);
      private toastr = inject(ToastrService);
      private location = inject(Location);
      isSubmitting = false;

      constructor() {}
    
      updatePasswordForm!: FormGroup;
    
      ngOnInit(): void {
        this.updatePasswordForm = this.fb.group({
          currentPassword: [null, ],
          password: [null, [Validators.required, Validators.minLength(6)]],
          confirmPassword: [null, [Validators.required]],
        }, {
          validators: ConfirmPasswordValidators.confirmPasswordValidator
        });
      }
    
      submitForm(): void {
        if (this.updatePasswordForm.invalid) {
          this.markFormGroupTouched(this.updatePasswordForm);
          return;
        }
        this.updatePassword();
      }

      updatePassword(){
        this.isSubmitting = true;
        this.accountService.updatePassword(this.updatePasswordForm.value)
        .subscribe({
          next: () => {
            this.toastr.success('Senha atualizada!', 'Sucesso');
            this.resetForm();
            this.isSubmitting = false;
          },
          error: () => {
            this.isSubmitting = false;
          }
        })
      }

      back(){
        this.location.back();
      }

      private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
          control.markAllAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        });
      }
      
      private resetForm(){
        this.updatePasswordForm.reset();
      }
}
