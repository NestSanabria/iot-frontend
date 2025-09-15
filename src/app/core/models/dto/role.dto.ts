// src/app/core/models/role.dto.ts

/**
 * DTO que representa un rol recibido del backend (por ejemplo, en listados).
 */
export interface RoleDTO {
  role_id: string;
  role_name: string;
  role_description?: string;
}

/**
 * DTO para crear un nuevo rol.
 * Enviado desde el frontend al backend (POST).
 */
export interface CreateRoleDTO {
  role_name: string;
  role_description: string;
}

/**
 * DTO para actualizar un rol existente.
 * Enviado desde el frontend al backend (PUT/PATCH).
 */
export interface UpdateRoleDTO {
  role_name: string;
  role_description: string;
}
