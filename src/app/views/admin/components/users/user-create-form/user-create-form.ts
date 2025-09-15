// src/app/views/admin/components/user/user-create-form/user-create-form.ts

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { RoleModel } from '../../../../../core/models/ui/role.model';
import { ZoneModel } from '../../../../../core/models/ui/zone.model';
import { UserModel } from '../../../../../core/models/ui/user.model';

import { UserService } from '../../../../../core/services/users/user.service';
import { HotToastService } from '@ngxpert/hot-toast';

import { ZoneSelectorComponent } from '../../zones/zone-selector/zone-selector';

import { mapUserModelToCreateDTO } from '../../../../../core/mappers';

/**
 * Componente formulario para crear usuarios.
 *
 * Ahora este componente recibe roles y zonas desde su padre,
 * para facilitar la reutilización y mantener la lógica clara.
 */
@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZoneSelectorComponent,
  ],
  templateUrl: './user-create-form.html',
  styleUrls: ['./user-create-form.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserCreateFormComponent {
  /** Roles disponibles para asignar, recibidos desde el padre */
  @Input() roles: RoleModel[] = [];

  /** Zonas disponibles para asignar, recibidas desde el padre */
  @Input() zones: ZoneModel[] = [];

  /** Evento que se emite cuando un usuario es creado */
  @Output() userCreated = new EventEmitter<void>();

  /** Evento para cancelar creación */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Modelo de usuario para el formulario.
   * Incluye password y lista de IDs de zonas seleccionadas.
   */
  newUser: UserModel & { password: string; zone_ids: string[] } = {
    firebaseUid: '',
    name: '',
    email: '',
    password: '',
    roleId: '',
    roleName: '',
    zones: [],
    zone_ids: [],
  };

  // Control de UI para validaciones y dropdowns
  roleTouched = false;
  isCollapsed = false;
  dropdownOpenRole = false;

  // Servicios inyectados con nueva API de Angular
  private userService = inject(UserService);
  private toast = inject(HotToastService);

  /**
   * Alterna la visibilidad del formulario (colapsable).
   */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Resetea el formulario y los valores internos.
   * @param form referencia al formulario Angular
   */
  resetForm(form: NgForm): void {
    this.newUser = {
      firebaseUid: '',
      name: '',
      email: '',
      password: '',
      roleId: '',
      roleName: '',
      zones: [],
      zone_ids: [],
    };
    form.resetForm(this.newUser);
    this.roleTouched = false;
    this.dropdownOpenRole = false;
  }

  /**
   * Actualiza la lista de zonas seleccionadas desde componente hijo.
   * @param updatedZoneIds arreglo de IDs de zonas seleccionadas
   */
  onZonesChanged(updatedZoneIds: string[]): void {
    this.newUser.zone_ids = updatedZoneIds;
  }

  /**
   * Envía el formulario para crear un nuevo usuario.
   * Valida datos, transforma modelo a DTO y llama al servicio.
   * @param form referencia al formulario Angular
   */
  onSubmit(form: NgForm): void {
    // Validaciones de selección obligatoria
    if (!this.newUser.roleId) {
      this.roleTouched = true;
      this.toast.warning('Debes seleccionar un rol válido');
      return;
    }

    if (!this.newUser.zone_ids || this.newUser.zone_ids.length === 0) {
      this.toast.warning('Debes seleccionar al menos una zona');
      return;
    }

    if (form.invalid) {
      this.toast.warning('Todos los campos son obligatorios');
      return;
    }

    // Mapeamos el modelo UI a DTO esperado por backend
    const createDTO = mapUserModelToCreateDTO(this.newUser, this.newUser.password);

    // Ejecutamos creación vía servicio
    this.userService.createUser({
      ...createDTO,
      zone_ids: this.newUser.zone_ids,
    }).subscribe({
      next: () => {
        this.toast.success('Usuario creado exitosamente');
        this.resetForm(form);
        this.userCreated.emit();
      },
      error: () => {
        this.toast.error('Error al crear el usuario');
      },
    });
  }

  /**
   * Abre/cierra el dropdown de selección de rol.
   */
  toggleDropdownRole(): void {
    this.dropdownOpenRole = !this.dropdownOpenRole;
  }

  /**
   * Maneja eventos de teclado para accesibilidad en dropdown de roles.
   * @param event evento de teclado
   */
  onKeydownRole(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeDropdownRole();
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdownRole();
      event.preventDefault();
    }
  }

  /**
   * Cierra el dropdown y marca el campo rol como tocado para validación.
   */
  closeDropdownRole(): void {
    this.dropdownOpenRole = false;
    this.roleTouched = true;
  }

  /**
   * Selecciona un rol y actualiza el modelo interno.
   * @param role rol seleccionado
   */
  selectRole(role: RoleModel): void {
    if (role.roleId) {
      this.newUser.roleId = role.roleId;
      this.newUser.roleName = role.roleName;
      this.dropdownOpenRole = false;
      this.roleTouched = true;
    }
  }

  /**
   * Obtiene la etiqueta del rol seleccionado para mostrar en UI.
   */
  get selectedRoleLabel(): string {
    const role = this.roles.find(r => r.roleId === this.newUser.roleId);
    return role ? role.roleName : 'Selecciona un rol';
  }
}
