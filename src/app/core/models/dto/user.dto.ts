// src/app/core/models/user.dto.ts

import { ZoneDTO } from './zone.dto';

/**
 * Data Transfer Object (DTO) que representa un usuario
 * tal como viene del backend (por ejemplo, en listados o autenticación).
 *
 * Este DTO incluye el identificador del rol, su nombre y las zonas asignadas al usuario.
 */
export interface UserDTO {
  firebase_uid: string;
  name: string;
  email: string;
  role_id: string;
  role_name: string;
  zones: ZoneDTO[];
}

/**
 * DTO para crear un nuevo usuario.
 * Este objeto se envía desde el frontend al backend (POST).
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role_id: string;
  zone_ids: string[];
}

/**
 * DTO para actualizar completamente un usuario existente (como admin).
 * Se utiliza cuando se requiere actualizar todos los campos, incluida la contraseña.
 */
export interface UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

/**
 * DTO usado específicamente para cambiar el rol de un usuario.
 * Útil cuando no se necesita actualizar otros datos del usuario.
 */
export interface UpdateUserRoleDTO {
  new_role_id: string;
}

/**
 * DTO para actualizar el perfil del propio usuario autenticado.
 * Generalmente expuesto en la vista de "Mi perfil".
 */
export interface UpdateProfileDTO {
  name: string;
  email: string;
}
