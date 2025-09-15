// src/app/views/admin/routes/adminRoutes.routes.ts

import { Routes } from '@angular/router';

// Layout del módulo Admin
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout';

// Páginas del módulo Admin
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard';
import { UserManagementComponent } from '../pages/user-management/user-management';

// Guard para verificar si el usuario es administrador
import { AdminGuard } from '../../../core/guards/admin-guard';

/**
 * Rutas protegidas del módulo Admin.
 * Accesibles solo por usuarios con rol de administrador (role_id === '01').
 */
export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard], // Protege todo el módulo Admin
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'usuarios',
        component: UserManagementComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
