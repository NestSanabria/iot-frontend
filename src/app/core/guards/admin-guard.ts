// src/app/core/guards/admin.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

/**
 * Guard que permite el acceso solo a usuarios con rol de administrador (role_id === '01').
 *
 * Este guard espera a que el observable `userData$` emita un valor no nulo,
 * lo que garantiza que los datos del usuario hayan sido cargados desde Firebase/backend.
 *
 * Si el usuario no tiene el rol adecuado, será redirigido a `/unauthorized`.
 * Si no hay sesión activa, será redirigido a `/login`.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userData$.pipe(
      // Esperar hasta que userData tenga algún valor (no null)
      filter(userData => userData !== null),
      take(1), // Solo una vez, luego completar el observable

      map(userData => {
        // Si el usuario es admin (role_id === '01'), permitir acceso
        if (userData?.role_id === '01') {
          return true;
        }

        // Si está autenticado pero no es admin → redirigir a /unauthorized
        if (userData) {
          return this.router.createUrlTree(['/unauthorized']);
        }

        // Por fallback (aunque no debería entrar aquí por el filter), redirigir a login
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
