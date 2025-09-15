// src/app/core/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, filter, take } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../../environments/environments';

/**
 * Interceptor de autenticación.
 *
 * - Agrega automáticamente el token JWT (de Firebase) a todas las peticiones que van al backend.
 * - Omite el agregado de tokens a peticiones externas (como APIs públicas o recursos de terceros).
 * - Captura y muestra errores HTTP para facilitar depuración.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isToBackend = req.url.startsWith(environment.backendApiUrl);

    // Si no es una petición al backend, dejarla pasar tal cual
    if (!isToBackend) {
      return next.handle(req);
    }

    return this.authService.getIdToken$().pipe(
      // Solo continuar si hay un token disponible
      filter((token): token is string => !!token),
      take(1), // Tomar el token actual y completar el observable

      switchMap(token => {
        // Clonamos la request agregando el header Authorization
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next.handle(clonedRequest);
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Error en AuthInterceptor:', error);
        return throwError(() => error);
      })
    );
  }
}
