// src/app/core/mappers/zone.mapper/zone.mapper.ts

import { ZoneDTO } from '../../models/dto/zone.dto';
import { ZoneModel } from '../../models/ui/zone.model';

/**
 * Transforma un ZoneDTO (del backend) a un ZoneModel (para la UI).
 */
export function mapZoneDTOToModel(dto: ZoneDTO): ZoneModel {
  return {
    zoneId: dto.zone_id,
    zoneName: dto.zone_name,
    zoneDescription: dto.zone_description,
  };
}

/**
 * Transforma un ZoneModel (de la UI) a ZoneCreateDTO.
 */
export function mapZoneModelToCreateDTO(model: ZoneModel) {
  return {
    zone_name: model.zoneName,
    zone_description: model.zoneDescription,
  };
}

/**
 * Transforma un ZoneModel (de la UI) a ZoneUpdateDTO.
 */
export function mapZoneModelToUpdateDTO(model: ZoneModel) {
  return {
    zone_name: model.zoneName,
    zone_description: model.zoneDescription,
  };
}
