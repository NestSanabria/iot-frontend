// src/app/core/services/devices/device.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

import {
  DeviceDTO,
  CreateDeviceDTO,
  UpdateDeviceDTO
} from '../../models/dto/device.dto';
import { DeviceModel } from '../../models/ui/device.model';
import { mapDeviceDTOToModel } from '../../mappers';

import { Observable, catchError, map, of, throwError } from 'rxjs';

/**
 * Servicio encargado de gestionar dispositivos IoT.
 */
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendApiUrl}/api/devices`;

  /**
   * Obtiene todos los dispositivos del sistema.
   */
  getAllDevices(): Observable<DeviceModel[]> {
    return this.http.get<DeviceDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(mapDeviceDTOToModel)),
      catchError(err => {
        console.error('Error al obtener dispositivos:', err);
        return of([]);
      })
    );
  }

  /**
   * Crea un nuevo dispositivo.
   */
  createDevice(data: CreateDeviceDTO): Observable<DeviceModel> {
    return this.http.post<DeviceDTO>(this.apiUrl, data).pipe(
      map(mapDeviceDTOToModel),
      catchError(err => {
        console.error('Error al crear dispositivo:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Actualiza un dispositivo existente.
   */
  updateDevice(deviceId: string, data: UpdateDeviceDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deviceId}`, data).pipe(
      catchError(err => {
        console.error('Error al actualizar dispositivo:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Elimina un dispositivo por ID.
   */
  deleteDevice(deviceId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deviceId}`).pipe(
      catchError(err => {
        console.error('Error al eliminar dispositivo:', err);
        return throwError(() => err);
      })
    );
  }
}
