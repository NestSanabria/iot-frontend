// src/app/core/models/zone.model.ts

/**
 * Modelo de zona utilizado internamente en el frontend (UI, formularios, dropdowns, etc.).
 */
export interface ZoneModel {
  zoneId: string;
  zoneName: string;
  zoneDescription?: string;
}
