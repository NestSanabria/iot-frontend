// src/app/core/mappers/role.mapper/role.mapper.ts

import { RoleDTO } from '../../models/dto/role.dto';
import { RoleModel } from '../../models/ui/role.model';

/**
 * Transforma un RoleDTO (del backend) a un RoleModel (para la UI).
 */
export function mapRoleDTOToModel(dto: RoleDTO): RoleModel {
  return {
    roleId: dto.role_id,
    roleName: dto.role_name,
    roleDescription: dto.role_description,
  };
}

/**
 * Transforma un RoleModel (de la UI) a un objeto CreateRoleDTO.
 */
export function mapRoleModelToCreateDTO(model: RoleModel) {
  return {
    role_name: model.roleName,
    role_description: model.roleDescription ?? '',
  };
}

/**
 * Transforma un RoleModel (de la UI) a un objeto UpdateRoleDTO.
 */
export function mapRoleModelToUpdateDTO(model: RoleModel) {
  return {
    role_name: model.roleName,
    role_description: model.roleDescription ?? '',
  };
}
