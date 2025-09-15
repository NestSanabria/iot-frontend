// src/app/core/services/auth/auth.service.ts

import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { authState } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environments';

import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

/**
 * Interfaz de respuesta esperada desde el backend luego de autenticarse con Firebase.
 */
export interface LoginResponse {
  firebase_uid: string;
  name: string;
  email: string;
  role_id: string;
  role_name: string;
  permissions: string[];
}

/**
 * Servicio central de autenticación, maneja login con Firebase y sincronización con backend.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Observable que emite el usuario Firebase actual (o null si no hay sesión).
   */
  user$: Observable<User | null>;

  /**
   * BehaviorSubject que almacena los datos del usuario (rol, permisos, etc.) tras el login backend.
   */
  private _userData = new BehaviorSubject<LoginResponse | null>(null);
  userData$ = this._userData.asObservable();

  constructor(
    private firebaseAuth: Auth,
    private http: HttpClient
  ) {
    // Configura persistencia para que la sesión dure solo durante la pestaña activa
    this.setSessionStoragePersistence();

    // Observable reactivo que se actualiza cuando cambia el estado de autenticación en Firebase
    this.user$ = authState(this.firebaseAuth);

    // Sincroniza estado del usuario desde backend si ya hay sesión iniciada
    this.user$.subscribe(fbUser => {
      if (fbUser) {
        const savedUserData = sessionStorage.getItem('userData');
        if (savedUserData) {
          this._userData.next(JSON.parse(savedUserData));
        } else {
          fbUser.getIdToken().then(token => {
            this.http.post<LoginResponse>(`${environment.backendApiUrl}/login`, { id_token: token })
              .subscribe({
                next: userData => {
                  this._userData.next(userData);
                  sessionStorage.setItem('userData', JSON.stringify(userData));
                },
                error: () => {
                  this._userData.next(null);
                  sessionStorage.removeItem('userData');
                }
              });
          });
        }
      } else {
        this._userData.next(null);
        sessionStorage.removeItem('userData');
      }
    });
  }

  /**
   * Define la persistencia de sesión solo mientras el navegador esté abierto.
   */
  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  /**
   * Registra un nuevo usuario con Firebase.
   * @param email Email del usuario
   * @param password Contraseña
   * @returns Observable con las credenciales o un error.
   */
  register(email: string, password: string): Observable<UserCredential | { error: string }> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Inicia sesión con Firebase y luego sincroniza con backend para obtener rol y permisos.
   * @param email Email del usuario
   * @param password Contraseña
   * @returns Observable con los datos del usuario o un error.
   */
  login(email: string, password: string): Observable<LoginResponse | { error: string }> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      switchMap(credentials =>
        from(credentials.user.getIdToken()).pipe(
          switchMap(idToken =>
            this.http.post<LoginResponse>(`${environment.backendApiUrl}/login`, { id_token: idToken })
          ),
          tap(userData => {
            this._userData.next(userData);
            sessionStorage.setItem('userData', JSON.stringify(userData));
          })
        )
      ),
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Devuelve un observable con el ID token de Firebase (JWT) del usuario actual.
   * Este token es usado para autenticarse en el backend.
   */
  getIdToken$(): Observable<string | null> {
    return this.user$.pipe(
      switchMap(user => user ? from(user.getIdToken()) : of(null))
    );
  }

  /**
   * Determina la ruta de inicio correspondiente al rol del usuario autenticado.
   */
  getHomeRouteByRole(role_id: string): string {
    switch (role_id) {
      case '01': return '/admin/dashboard';
      case '02': return '/tecnico/dashboard';
      case '03': return '/analista/dashboard';
      case '04': return '/usuario/dashboard';
      default: return '/login';
    }
  }

  /**
   * Cierra la sesión de Firebase y limpia datos locales.
   */
  logout(): Observable<void | { error: string }> {
    return from(
      signOut(this.firebaseAuth).then(() => {
        sessionStorage.clear();
        this._userData.next(null);
      })
    ).pipe(
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Devuelve los datos del usuario actual del backend (role_id, permisos, etc.)
   */
  getCurrentUserData(): LoginResponse | null {
    return this._userData.value;
  }

  /**
   * Verifica si el usuario actual tiene un permiso específico.
   */
  hasPermission(permission: string): boolean {
    const userData = this._userData.value;
    return userData?.permissions?.includes(permission) ?? false;
  }
}
