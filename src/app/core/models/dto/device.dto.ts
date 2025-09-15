// src/app/core/models/device.dto.ts

/**
 * DTO que representa un dispositivo recibido desde el backend.
 */
export interface DeviceDTO {
  device_id: string;
  device_name: string;
  device_type: string;
  zone_id: string;
  device_description?: string;
  created_at: string;
  updated_at: string;
}

/**
 * DTO para crear un nuevo dispositivo.
 */
export interface CreateDeviceDTO {
  device_name: string;
  device_type: string;
  zone_id: string;
  device_description?: string;
}

/**
 * DTO para actualizar un dispositivo existente.
 */
export interface UpdateDeviceDTO {
  device_name: string;
  device_type: string;
  zone_id: string;
  device_description?: string;
}
