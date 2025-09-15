// src/app/dashboard/admin/components/zones/zone-selector/zone-selector.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneModel } from '../../../../../core/models/ui/zone.model';

/**
 * Componente selector de zonas para asignar una o más zonas a un usuario.
 * Recibe una lista de zonas (modelos UI) y mantiene la selección mediante
 * un arreglo de IDs de zonas seleccionadas.
 */
@Component({
  selector: 'app-zone-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone-selector.html',
  styleUrls: ['./zone-selector.scss']
})
export class ZoneSelectorComponent {
  /**
   * Lista de zonas disponibles para seleccionar.
   * Tipo: Modelo UI ZoneModel[]
   */
  @Input() zones: ZoneModel[] = [];

  /**
   * IDs de las zonas que actualmente están seleccionadas.
   */
  @Input() selectedZoneIds: string[] = [];

  /**
   * Evento que emite la lista actualizada de IDs de zonas seleccionadas.
   */
  @Output() selectionChange = new EventEmitter<string[]>();

  /**
   * Método para agregar o remover una zona de la selección.
   * @param zoneId ID de la zona que se seleccionó o deseleccionó.
   * @param checked Estado del checkbox: true si se seleccionó, false si se quitó.
   */
  toggleZone(zoneId: string, checked: boolean): void {
    const updated = checked
      ? [...this.selectedZoneIds, zoneId]
      : this.selectedZoneIds.filter(id => id !== zoneId);

    this.selectedZoneIds = updated;
    this.selectionChange.emit(this.selectedZoneIds);
  }
}
