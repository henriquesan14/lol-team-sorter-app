import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class ConfirmPasswordValidators {
  static confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password?.value || !confirmPassword?.value) {
      return null;
    }

    if (confirmPassword.value.length > 0 && confirmPassword.value !== password.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
    } else {
      confirmPassword.setErrors(null); // limpa o erro se estiver tudo certo
    }

    return null;
  }
}