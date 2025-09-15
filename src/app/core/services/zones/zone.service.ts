// src/app/core/services/zones/zone.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

import { ZoneDTO } from '../../models/dto/zone.dto';
import { ZoneModel } from '../../models/ui/zone.model';
import { mapZoneDTOToModel } from '../../mappers';

import { Observable, catchError, map, of, throwError } from 'rxjs';

/**
 * Servicio para gestionar zonas en la aplicación.
 * Proporciona métodos para obtener zonas desde el backend,
 * transformando los datos (DTO) en modelos para uso en la UI.
 */
@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendApiUrl}/api/zones`;

  /**
   * Obtiene todas las zonas desde el backend.
   * Transforma cada ZoneDTO en ZoneModel para uso en la UI.
   *
   * @returns Observable de un arreglo de ZoneModel.
   */
  getAllZones(): Observable<ZoneModel[]> {
    return this.http.get<ZoneDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(mapZoneDTOToModel)),
      catchError(err => {
        console.error('Error al cargar zonas:', err);
        // Retorna arreglo vacío para evitar errores en la UI
        return of([]);
      })
    );
  }

  /**
   * Obtiene las zonas asignadas a un usuario específico,
   * según su Firebase UID.
   * Aplica la transformación a ZoneModel para la UI.
   *
   * @param firebaseUID Identificador Firebase del usuario
   * @returns Observable de un arreglo de ZoneModel
   */
  getZonesByUser(firebaseUID: string): Observable<ZoneModel[]> {
    return this.http.get<{ zones: ZoneDTO[] }>(`${this.apiUrl}/users/${firebaseUID}/zones`).pipe(
      map(response => response.zones.map(mapZoneDTOToModel)),
      catchError(err => {
        console.error('Error al cargar zonas del usuario:', err);
        // Propaga el error para manejo externo si es necesario
        return throwError(() => err);
      })
    );
  }
}
