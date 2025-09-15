// srsc/app/features/auth/pages/login/login.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
// IMPORTANTE: Cambiar a MatSnackBar si no quieres ngxpert/hot-toast o si no funciona
import { HotToastService } from '@ngxpert/hot-toast';

import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'], // corregido: styleUrl -> styleUrls
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  // Aquí deberías usar esta variable para mostrar datos (o elimina si no la usas)
  backendUserData: any = null;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe((result) => {
      if ('error' in result) {
        this.toast.error(`Login failed: ${result.error}`);
      } else {
        this.toast.success('Welcome back to IoT App!');

        sessionStorage.setItem('userData', JSON.stringify(result));

        // Redirige según el role_id
        switch (result.role_id) {
          case '01':
            this.router.navigateByUrl('/admin/dashboard');
            break;
          case '02':
            this.router.navigateByUrl('/tecnico/dashboard');
            break;
          case '03':
            this.router.navigateByUrl('/analista/dashboard');
            break;
          case '04':
            this.router.navigateByUrl('/usuario/dashboard');
            break;
          default:
            this.toast.error('Rol no reconocido');
            this.router.navigateByUrl('/login');
        }
      }
    });
  }
}
