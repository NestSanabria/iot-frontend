// src/app/core/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

/**
 * Guard de rutas que protege acceso a rutas según:
 * - Estado de autenticación.
 * - Rol del usuario (opcional).
 * - Permisos específicos (opcional, si lo implementas).
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Verifica si el usuario puede acceder a la ruta.
   * Si no está autenticado, redirige a /login.
   * Si está autenticado pero no tiene los roles requeridos, redirige a /unauthorized.
   *
   * @param route ActivatedRouteSnapshot para acceder a data['roles'] o data['permissions']
   * @returns Observable<boolean | UrlTree>
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    // Roles requeridos definidos en la ruta (por ejemplo: data: { roles: ['01', '02'] })
    const allowedRoles = route.data['roles'] as string[] | undefined;

    // Opcional: permisos requeridos (si decides usarlo en el futuro)
    // const requiredPermissions = route.data['permissions'] as string[] | undefined;

    return this.authService.userData$.pipe(
      take(1),
      map(userData => {
        // No autenticado
        if (!userData) {
          return this.router.createUrlTree(['/login']);
        }

        // Validación de roles si se especificaron en la ruta
        if (allowedRoles && !allowedRoles.includes(userData.role_id)) {
          return this.router.createUrlTree(['/unauthorized']);
        }

        // Si implementas permisos, aquí puedes validar también
        /*
        if (requiredPermissions) {
          const hasAllPermissions = requiredPermissions.every(p =>
            userData.permissions.includes(p)
          );
          if (!hasAllPermissions) {
            return this.router.createUrlTree(['/unauthorized']);
          }
        }
        */

        // Acceso permitido
        return true;
      })
    );
  }
}
