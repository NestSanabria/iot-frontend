// src/app/core/models/device.model.ts

/**
 * Modelo de dispositivo utilizado internamente en el frontend.
 */
export interface DeviceModel {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  zoneId: string;
  deviceDescription?: string;
  deviceLastUpdated?: string;
}
