// src/app/dashboards/admin/pages/user-management/user-management.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Servicios para obtener roles y zonas
import { RoleService } from '../../../../core/services/roles/role.service';
import { ZoneService } from '../../../../core/services/zones/zone.service';

// Modelos usados en la UI (camelCase)
import { RoleModel } from '../../../../core/models/ui/role.model';
import { ZoneModel } from '../../../../core/models/ui/zone.model';

// Notificaciones
import { HotToastService } from '@ngxpert/hot-toast';

// Componente del formulario de creación de usuario
import { UserCreateFormComponent } from '../../components/users/user-create-form/user-create-form';

/**
 * Componente para la gestión de usuarios dentro del módulo Admin.
 * Permite cargar roles y zonas para asignación, y manejar eventos
 * relacionados con creación de usuarios.
 */
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    UserCreateFormComponent,
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
})
export class UserManagementComponent implements OnInit {

  /** Lista de roles disponibles para la UI (obtenidos del backend y mapeados) */
  roles: RoleModel[] = [];

  /** Lista de zonas disponibles para la UI (obtenidas del backend y mapeadas) */
  zones: ZoneModel[] = [];

  // Inyección de dependencias necesarias
  private roleService = inject(RoleService);
  private zoneService = inject(ZoneService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  /**
   * Ciclo de vida - Se ejecuta al inicializar el componente.
   * Carga las listas de roles y zonas para ser usadas en formularios.
   */
  ngOnInit(): void {
    this.loadRoles();
    this.loadZones();
  }

  /**
   * Carga todos los roles disponibles desde el backend.
   * Se asume que el servicio ya realiza el mapeo de RoleDTO → RoleModel.
   * Se agrega una opción por defecto al inicio de la lista.
   */
  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles: RoleModel[]) => {
        // Se agrega opción por defecto para selección
        this.roles = [
          { roleId: '', roleName: 'Selecciona un rol' },
          ...roles,
        ];
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        this.toast.error('Error al cargar roles');
        // Se agrega opción por defecto para evitar errores en la UI
        this.roles = [{ roleId: '', roleName: 'Selecciona un rol' }];
      },
    });
  }

  /**
   * Carga todas las zonas disponibles desde el backend.
   * Se asume que el servicio ya realiza el mapeo de ZoneDTO → ZoneModel.
   */
  loadZones(): void {
    this.zoneService.getAllZones().subscribe({
      next: (zones: ZoneModel[]) => {
        this.zones = zones;
      },
      error: (err) => {
        console.error('Error al cargar zonas:', err);
        this.toast.error('Error al cargar zonas');
      },
    });
  }

  /**
   * Método ejecutado cuando un usuario es creado correctamente desde el formulario hijo.
   * Muestra un mensaje de éxito y puede usarse para refrescar listas.
   */
  onUserCreated(): void {
    this.toast.success('Usuario creado correctamente');
    // TODO: Agregar lógica para recargar usuarios si se implementa en el futuro
  }

  /**
   * Navega de regreso al dashboard principal del administrador.
   */
  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
