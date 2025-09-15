// src/app/shared/layouts/user-form/user-form.component.ts

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Role {
  id: string;
  label: string;
}

interface ZoneDTO {
  zone_id: string;
  zone_name: string;
  zone_description?: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserFormComponent {
  @Input() mode: 'create' | 'edit' | 'edit-profile' = 'create';
  @Input() user: Partial<{ name: string; email: string; password?: string; role_id?: string }> = {};
  @Input() roles: Role[] = [];
  @Input() availableZones: ZoneDTO[] = [];
  @Input() selectedZoneIds: string[] = [];
  @Input() isDisabled = false;
  @Input() roleTouched = false;

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() zoneToggle = new EventEmitter<string>();
  @Output() userChange = new EventEmitter<Partial<{ name: string; email: string; password?: string; role_id?: string }>>();

  dropdownOpen = false;

  toggleDropdown() {
    if (this.isDisabled) return;
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.roleTouched = true;
  }

  selectRole(role: Role) {
    if (this.mode === 'edit-profile' || this.isDisabled) return;
    this.user.role_id = role.id;
    this.dropdownOpen = false;
    this.emitUserChange();
    this.roleTouched = true;
  }

  emitUserChange() {
    this.userChange.emit(this.user);
  }

  isAdmin(): boolean {
    return this.user.role_id === '01';
  }

  isZoneSelected(zone_id: string): boolean {
    return this.selectedZoneIds.includes(zone_id);
  }

  onZoneCheckboxToggle(zone_id: string): void {
    if (this.isDisabled) return;
    this.zoneToggle.emit(zone_id);
  }

  get selectedRoleLabel(): string {
    const role = this.roles.find(r => r.id === this.user.role_id);
    return role ? role.label : 'Selecciona un rol';
  }

  onKeydown(event: KeyboardEvent) {
    if (this.isDisabled) return;

    if (!this.dropdownOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.dropdownOpen = true;
      return;
    }
    if (this.dropdownOpen && event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      return;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: EventTarget | null) {
    if (this.dropdownOpen) {
      if (targetElement instanceof HTMLElement) {
        const clickedInside = targetElement.closest('.custom-select');
        if (!clickedInside) {
          this.closeDropdown();
        }
      } else {
        this.closeDropdown();
      }
    }
  }
}
