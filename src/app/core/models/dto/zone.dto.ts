// src/app/core/models/zone.dto.ts

/**
 * DTO que representa una zona tal como es recibida del backend.
 */
export interface ZoneDTO {
  zone_id: string;
  zone_name: string;
  zone_description?: string;
}

/**
 * DTO para crear una nueva zona (envío al backend).
 */
export interface ZoneCreateDTO {
  zone_name: string;
  zone_description?: string;
}

/**
 * DTO para actualizar una zona existente (envío al backend).
 */
export interface ZoneUpdateDTO {
  zone_name: string;
  zone_description?: string;
}
