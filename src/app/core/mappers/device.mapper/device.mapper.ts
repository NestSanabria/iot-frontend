// src/app/core/mappers/device.mapper/device.mapper.ts

import { DeviceDTO } from '../../models/dto/device.dto';
import { DeviceModel } from '../../models/ui/device.model'; /** * Transforma un DeviceDTO (del backend) a un DeviceModel (para la UI). */

export function mapDeviceDTOToModel(dto: DeviceDTO): DeviceModel {

  return { deviceId: dto.device_id, deviceName: dto.device_name, deviceType: dto.device_type, zoneId: dto.zone_id, deviceDescription: dto.device_description, deviceLastUpdated: dto.updated_at, };
} /** * Transforma un DeviceModel (desde la UI) a un DTO para actualizar. */
export function mapDeviceModelToUpdateDTO(model: DeviceModel): Partial<DeviceDTO> { return { device_name: model.deviceName, device_type: model.deviceType, zone_id: model.zoneId, device_description: model.deviceDescription, }; }