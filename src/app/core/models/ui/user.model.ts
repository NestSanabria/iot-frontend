// src/app/core/models/user.model.ts

import { ZoneModel } from './zone.model';

/**
 * Modelo del usuario usado internamente en el frontend (UI, formularios, etc.).
 * Adaptado del UserDTO recibido del backend.
 */
export interface UserModel {
  firebaseUid: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  zones: ZoneModel[];
}
