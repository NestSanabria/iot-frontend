// src/app/shared/data/role-loader/role-loader.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleModel } from '../../../core/models/ui/role.model'; // Modelo de UI
import { RoleService } from '../../../core/services/roles/role.service'; // Servicio ya hace el mapeo
import { HotToastService } from '@ngxpert/hot-toast';

/**
 * Componente sin interfaz visual, encargado de cargar roles
 * desde el backend (vía servicio) y emitirlos mapeados a UI.
 */
@Component({
  selector: 'app-role-loader',
  standalone: true,
  imports: [CommonModule],
  template: '', // No hay UI, es un componente de lógica
})
export class RoleLoaderComponent implements OnInit {

  /**
   * Evento emitido cuando los roles han sido cargados correctamente.
   * Se emite un arreglo de RoleModel, listo para usar en formularios o tablas.
   */
  @Output() rolesLoaded = new EventEmitter<RoleModel[]>();

  constructor(
    private roleService: RoleService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles: RoleModel[]) => {
        // Insertamos una opción por defecto al inicio
        const rolesWithDefault: RoleModel[] = [
          { roleId: '', roleName: 'Selecciona un rol' },
          ...roles,
        ];
        this.rolesLoaded.emit(rolesWithDefault);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        this.toast.error('Error al cargar roles');

        // Emitimos solo la opción por defecto
        this.rolesLoaded.emit([
          { roleId: '', roleName: 'Selecciona un rol' },
        ]);
      },
    });
  }
}
