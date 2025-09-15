// src/app/features/admin/layout/admin-layout.ts

import { Component } from '@angular/core';
import { SidebarLink } from '../../../../shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutContainerComponent } from '../../../../shared/layouts/app-layout-container/app-layout-container';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AppLayoutContainerComponent],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;

  adminLinks: SidebarLink[] = [
    {
      label: 'Administración',
      icon: 'admin_panel_settings',
      children: [
        { label: 'Usuarios', icon: 'group', route: '/admin/usuarios' },
        { label: 'Permisos', icon: 'vpn_key', route: '/admin/permisos' },
        { label: 'Roles', icon: 'badge', route: '/admin/roles' },
      ],
    },
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Zonas', icon: 'map', route: '/admin/zonas' },
    { label: 'Dispositivos', icon: 'devices', route: '/admin/dispositivos' },
  ];

  onSidebarCollapseChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
