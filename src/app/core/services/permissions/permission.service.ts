// src/app/core/services/permissions/permission.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

import { PermissionDTO, CreatePermissionDTO, AssignPermissionsDTO } from '../../models/dto/permission.dto';
import { PermissionModel } from '../../models/ui/permission.model';
import { mapPermissionDTOToModel } from '../../mappers';

import { Observable, catchError, map, of, throwError } from 'rxjs';

/**
 * Servicio encargado de gestionar permisos en la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendApiUrl}/api/permissions`;

  /**
   * Obtiene todos los permisos y los transforma para la UI.
   */
  getAllPermissions(): Observable<PermissionModel[]> {
    return this.http.get<PermissionDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(mapPermissionDTOToModel)),
      catchError(err => {
        console.error('Error al cargar permisos:', err);
        return of([]);
      })
    );
  }

  /**
   * Crea un nuevo permiso en el sistema.
   */
  createPermission(data: CreatePermissionDTO): Observable<PermissionModel> {
    return this.http.post<PermissionDTO>(this.apiUrl, data).pipe(
      map(mapPermissionDTOToModel),
      catchError(err => {
        console.error('Error al crear permiso:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Asigna múltiples permisos a un rol específico.
   */
  assignPermissionsToRole(roleId: string, data: AssignPermissionsDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assign/${roleId}`, data).pipe(
      catchError(err => {
        console.error('Error al asignar permisos al rol:', err);
        return throwError(() => err);
      })
    );
  }
}
