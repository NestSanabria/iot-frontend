// src/app/core/mappers/user.mapper/user.mapper.ts

import {
  UserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  UpdateUserRoleDTO,
  UpdateProfileDTO,
} from '../../models/dto/user.dto';

import { UserModel } from '../../models/ui/user.model';
import { mapZoneDTOToModel } from '../zone.mapper/zone.mapper';
import { ZoneModel } from '../../models/ui/zone.model';
import { ZoneDTO } from '../../models/dto/zone.dto';

/**
 * Transforma un UserDTO (del backend) a un UserModel (para la UI).
 */
export function mapUserDTOToModel(dto: UserDTO): UserModel {
  return {
    firebaseUid: dto.firebase_uid,
    name: dto.name,
    email: dto.email,
    roleId: dto.role_id,
    roleName: dto.role_name,
    zones: dto.zones.map(mapZoneDTOToModel),
  };
}

/**
 * Transforma un UserModel (desde la UI) a un CreateUserDTO para crear un usuario.
 */
export function mapUserModelToCreateDTO(model: UserModel, password: string): CreateUserDTO {
  return {
  name: model.name,
  email: model.email,
  password,
  role_id: model.roleId,
  zone_ids: []
};
}

/**
 * Transforma un UserModel (desde la UI) a un UpdateUserDTO para actualizar un usuario.
 */
export function mapUserModelToUpdateDTO(model: UserModel, password?: string): UpdateUserDTO {
  return {
    name: model.name,
    email: model.email,
    password: password ?? '', // O puedes omitirlo si el backend lo permite
    role_id: model.roleId,
  };
}

/**
 * Transforma un UserModel para actualizar solo el rol.
 */
export function mapUserModelToUpdateRoleDTO(model: UserModel): UpdateUserRoleDTO {
  return {
    new_role_id: model.roleId,
  };
}

/**
 * Transforma un UserModel para actualizar el propio perfil del usuario.
 */
export function mapUserModelToUpdateProfileDTO(model: UserModel): UpdateProfileDTO {
  return {
    name: model.name,
    email: model.email,
  };
}
