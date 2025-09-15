// src/app/core/models/permission.dto.ts

/**
 * DTO que representa un permiso recibido desde el backend.
 */
export interface PermissionDTO {
  permission_id: string;
  permission_name: string;
  permission_description: string;
  permission_created_at: string;
  updated_at?: string;
}

/**
 * DTO para crear un nuevo permiso (POST).
 */
export interface CreatePermissionDTO {
  permission_name: string;
  description: string;
}

/**
 * DTO para asignar permisos a un rol.
 */
export interface AssignPermissionsDTO {
  permission_ids: string[];
}
