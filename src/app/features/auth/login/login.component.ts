import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthService } from '../../../shared/services/auth.service';
import { Credentials } from '../../../core/models/credentials.interface';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../shared/services/local-storage.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule, NzButtonModule, NzCardModule, NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalstorageService);
  private router = inject(Router);

  loading = false;

  loginForm: FormGroup<{
      username: FormControl<string>;
      password: FormControl<string>;
    }> = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      
    });

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login(){
    this.loading = true;
    const credentials = this.loginForm.value as Credentials;
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.localStorageService.setAuthStorage(res);
        this.router.navigate(['/matchmaking/generate']);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  loginWithDiscord() {
    window.location.href = 
    `https://discord.com/oauth2/authorize?client_id=${environment.discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(environment.discordRedirectUri)}&scope=identify`;
  }
}
