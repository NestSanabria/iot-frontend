// src/app/core/services/users/user.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

import {
  CreateUserDTO,
  UpdateUserDTO,
  UserDTO
} from '../../models/dto/user.dto';

import { UserModel } from '../../models/ui/user.model';
import { ZoneModel } from '../../models/ui/zone.model';
import { ZoneDTO } from '../../models/dto/zone.dto';

import {
  mapUserDTOToModel,
  mapZoneDTOToModel
} from '../../mappers';

import { Observable, map, catchError, of, throwError } from 'rxjs';

/**
 * Servicio para manejar todas las operaciones relacionadas con usuarios.
 * Se comunica con el backend utilizando DTOs y transforma a modelos de UI usando mappers.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendApiUrl}/api/users`;

  /**
   * Obtiene todos los usuarios desde el backend y los transforma a modelos para la UI.
   */
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(mapUserDTOToModel)),
      catchError(err => {
        console.error('Error al cargar usuarios:', err);
        return of([]); // Devuelve lista vacía si falla
      })
    );
  }

  /**
   * Crea un nuevo usuario en el backend usando un DTO.
   */
  createUser(user: CreateUserDTO): Observable<UserModel> {
    return this.http.post<UserDTO>(this.apiUrl, user).pipe(
      map(mapUserDTOToModel),
      catchError(err => {
        console.error('Error al crear usuario:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Elimina un usuario del backend según su UID.
   */
  deleteUser(firebaseUID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${firebaseUID}`).pipe(
      catchError(err => {
        console.error('Error al eliminar usuario:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Actualiza los datos de un usuario (nombre, email, etc.).
   */
  updateUser(firebaseUID: string, data: UpdateUserDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${firebaseUID}`, data).pipe(
      catchError(err => {
        console.error('Error al actualizar usuario:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Cambia el rol de un usuario.
   */
  updateUserRole(firebaseUID: string, newRoleId: string): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${firebaseUID}/role`, { new_role_id: newRoleId })
      .pipe(
        catchError(err => {
          console.error('Error al actualizar el rol del usuario:', err);
          return throwError(() => err);
        })
      );
  }

  /**
   * Obtiene las zonas asignadas a un usuario.
   */
  getZonesByUser(firebaseUID: string): Observable<ZoneModel[]> {
    return this.http
      .get<{ zones: ZoneDTO[] }>(`${this.apiUrl}/${firebaseUID}/zones`)
      .pipe(
        map(response => response.zones.map(mapZoneDTOToModel)),
        catchError(err => {
          console.error('Error al obtener zonas del usuario:', err);
          return throwError(() => err);
        })
      );
  }

  /**
   * Actualiza las zonas asignadas a un usuario.
   */
  updateZonesOfUser(firebaseUID: string, zoneIds: string[]): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${firebaseUID}/zones`, { zone_ids: zoneIds })
      .pipe(
        catchError(err => {
          console.error('Error al actualizar zonas del usuario:', err);
          return throwError(() => err);
        })
      );
  }
}
