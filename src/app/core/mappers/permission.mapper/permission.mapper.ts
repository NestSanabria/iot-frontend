// src/app/core/mappers/permission.mapper/permission.mapper.ts

import {
  PermissionDTO,
  CreatePermissionDTO,
  AssignPermissionsDTO,
} from '../../models/dto/permission.dto';

import { PermissionModel } from '../../models/ui/permission.model';

/**
 * Transforma un PermissionDTO (del backend) a un PermissionModel (para la UI).
 */
export function mapPermissionDTOToModel(dto: PermissionDTO): PermissionModel {
  return {
    permissionId: dto.permission_id,
    permissionName: dto.permission_name,
    permissionDescription: dto.permission_description,
  };
}

/**
 * Transforma un PermissionModel (de la UI) a CreatePermissionDTO.
 */
export function mapPermissionModelToCreateDTO(model: PermissionModel): CreatePermissionDTO {
  return {
    permission_name: model.permissionName,
    description: model.permissionDescription,
  };
}

/**
 * Crea un DTO para asignar múltiples permisos a un rol.
 */
export function mapPermissionsToAssignDTO(permissionIds: string[]): AssignPermissionsDTO {
  return {
    permission_ids: permissionIds,
  };
}
