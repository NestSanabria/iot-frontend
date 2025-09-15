// src/app/dashboards/admin/pages/admin-dashboard/admin-dashboard.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService, LoginResponse } from '../../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';

/**
 * Componente principal del dashboard para el rol Admin.
 *
 * - Muestra información básica del usuario autenticado (nombre, correo, rol).
 * - Controla la visibilidad del sidebar para navegación.
 * - Puede extenderse para cargar y mostrar widgets o datos estadísticos.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  /**
   * Observable con los datos del usuario autenticado (rol, permisos, email, etc.).
   * Se suscribe desde AuthService para mantener sincronía reactiva.
   */
  userData$: Observable<LoginResponse | null>;

  /**
   * Estado local para controlar la apertura/cierre del menú lateral (sidebar).
   */
  isSidebarOpen = false;

  constructor(private authService: AuthService) {
    // Se obtiene el observable reactivo que contiene la info del usuario autenticado
    this.userData$ = this.authService.userData$;
  }

  /**
   * Alterna el estado de visibilidad del menú lateral (sidebar).
   * Se puede utilizar para controlar clases CSS o animaciones.
   */
  toggleSidebarMenu(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
