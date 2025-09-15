// src/app/core/models/role.model.ts

/**
 * Modelo de rol utilizado internamente en el frontend (UI).
 *
 * Este modelo puede ser adaptado desde un RoleDTO recibido del backend,
 * y se usa, por ejemplo, para desplegar en dropdowns o tablas.
 */
export interface RoleModel {
  roleId: string;
  roleName: string;
  roleDescription?: string;
}
