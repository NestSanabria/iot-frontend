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

import { mapUserModelToCreateDTO } from '../../../../../core/mappers';

/**
 * Componente formulario para crear usuarios.
 */
@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  /** Evento para cancelar creación (se usa para notificar al padre si quiere) */
  @Output() cancel = new EventEmitter<void>();

  /** Modelo de usuario para el formulario */
  newUser: UserModel & { password: string; zoneIds: string[] } = this.getEmptyUser();

  // Control UI
  roleTouched = false;
  zonesTouched = false;
  dropdownOpenRole = false;
  zonesListOpen = false;

  /** Controla si la tarjeta está colapsada (oculta) o desplegada */
  isCollapsed = true;

  // Servicios inyectados
  private userService = inject(UserService);
  private toast = inject(HotToastService);

  /** Inicializa un nuevo usuario vacío */
  private getEmptyUser() {
    return {
      firebaseUid: '',
      name: '',
      email: '',
      password: '',
      roleId: '',
      roleName: '',
      zones: [],
      zoneIds: [],
    };
  }

  /**
   * Alterna la visibilidad de la tarjeta (colapsable)
   */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      // Si se colapsa, opcional: limpiar errores y dropdown
      this.roleTouched = false;
      this.zonesTouched = false;
      this.dropdownOpenRole = false;
      this.zonesListOpen = false;
    }
  }

  toggleZonesList() {
    this.zonesListOpen = !this.zonesListOpen;
  }
  /**
   * Limpia el formulario y oculta la tarjeta (colapsa)
   */
  resetForm(form: NgForm): void {
    this.newUser = this.getEmptyUser();
    form.resetForm(this.newUser);
    this.roleTouched = false;
    this.zonesTouched = false;
    this.dropdownOpenRole = false;
    this.zonesListOpen = false;
    this.isCollapsed = true;
    this.cancel.emit(); // Notifica al padre que se canceló
  }

  /**
   * Maneja el cambio de selección de zonas (checkbox).
   */
  onZoneCheckboxChange(event: Event, zoneId: string) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.newUser.zoneIds.includes(zoneId)) {
        this.newUser.zoneIds.push(zoneId);
      }
    } else {
      this.newUser.zoneIds = this.newUser.zoneIds.filter(id => id !== zoneId);
    }
    this.zonesTouched = true;
  }

  /**
   * Envía el formulario para crear un nuevo usuario.
   */
  onSubmit(form: NgForm): void {
    if (!this.newUser.roleId) {
      this.roleTouched = true;
      this.toast.warning('Debes seleccionar un rol válido');
      return;
    }

    if (!this.newUser.zoneIds || this.newUser.zoneIds.length === 0) {
      this.zonesTouched = true;
      this.toast.warning('Debes seleccionar al menos una zona');
      return;
    }

    if (form.invalid) {
      this.toast.warning('Todos los campos son obligatorios');
      return;
    }

    const createDTO = mapUserModelToCreateDTO(this.newUser, this.newUser.password);

    this.userService.createUser({
      ...createDTO,
      zone_ids: this.newUser.zoneIds,
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

  // Dropdown rol:
  toggleDropdownRole(): void {
    this.dropdownOpenRole = !this.dropdownOpenRole;
  }

  onKeydownRole(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeDropdownRole();
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdownRole();
      event.preventDefault();
    }
  }

  closeDropdownRole(): void {
    this.dropdownOpenRole = false;
    this.roleTouched = true;
  }

  selectRole(role: RoleModel): void {
    if (role.roleId) {
      this.newUser.roleId = role.roleId;
      this.newUser.roleName = role.roleName;
      this.dropdownOpenRole = false;
      this.roleTouched = true;
    }
  }

  get selectedRoleLabel(): string {
    const role = this.roles.find(r => r.roleId === this.newUser.roleId);
    return role ? role.roleName : 'Selecciona un rol';
  }
}
