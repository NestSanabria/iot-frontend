// src/app/core/services/roles/role.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

import { RoleDTO } from '../../models/dto/role.dto';
import { RoleModel } from '../../models/ui/role.model';
import { mapRoleDTOToModel } from '../../mappers';

import { Observable, catchError, map, of } from 'rxjs';

/**
 * Servicio para gestionar roles de usuario en la aplicación.
 * Obtiene roles desde el backend y los transforma en modelos
 * adecuados para la UI.
 */
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendApiUrl}/api/roles`;

  /**
   * Obtiene todos los roles disponibles en el sistema.
   * Aplica transformación para adaptar datos backend (DTO)
   * a modelos de UI.
   *
   * @returns Observable de un arreglo de RoleModel.
   */
  getAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(mapRoleDTOToModel)),
      catchError(err => {
        console.error('Error al cargar roles:', err);
        // Retorna arreglo vacío para evitar fallos en la UI
        return of([]);
      })
    );
  }
}
