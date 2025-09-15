// src/app/shared/data/zone-loader/zone-loader.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneModel } from '../../../core/models/ui/zone.model'; // Modelo UI
import { ZoneService } from '../../../core/services/zones/zone.service'; // Servicio ya mapea
import { HotToastService } from '@ngxpert/hot-toast';

/**
 * Componente sin UI para cargar zonas desde el backend.
 * Utiliza el servicio y emite un arreglo de ZoneModel ya mapeado.
 */
@Component({
  selector: 'app-zone-loader',
  standalone: true,
  imports: [CommonModule],
  template: '', // No tiene UI
})
export class ZoneLoaderComponent implements OnInit {

  /**
   * Evento emitido cuando las zonas han sido cargadas correctamente.
   * Se emite un arreglo de ZoneModel.
   */
  @Output() zonesLoaded = new EventEmitter<ZoneModel[]>();

  constructor(
    private zoneService: ZoneService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.zoneService.getAllZones().subscribe({
      next: (zones: ZoneModel[]) => {
        this.zonesLoaded.emit(zones);
      },
      error: (err) => {
        console.error('Error al cargar zonas:', err);
        this.toast.error('Error al cargar zonas');

        // Emitimos arreglo vacío para evitar errores en la UI
        this.zonesLoaded.emit([]);
      },
    });
  }
}
