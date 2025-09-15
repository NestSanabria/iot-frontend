// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login';

// Rutas del módulo Admin (con layout y guard)
import { adminRoutes } from './views/admin/routes/adminRoutes.routes';

// Componente para acceso no autorizado
import { UnauthorizedComponent } from './views/unauthorized/unauthorized';

// (Opcional en el futuro) Otros módulos:
// import { technicianRoutes } from './views/technician/routes/technician.routes';
// import { analystRoutes } from './views/analyst/routes/analyst.routes';
// import { userRoutes } from './views/user/routes/user.routes';

/**
 * Definición global de rutas de la aplicación.
 */
export const routes: Routes = [
  /**
   * Ruta raíz → redirige a login.
   */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /**
   * Página de login (pública).
   */
  { path: 'login', component: LoginComponent },

  /**
   * Página para usuarios autenticados sin permisos suficientes.
   */
  { path: 'unauthorized', component: UnauthorizedComponent },

  /**
   * Módulo Admin (acceso solo a usuarios con rol de administrador).
   */
  ...adminRoutes,

  /**
   * (Futuro) Rutas para otros módulos por rol.
   */
  // ...technicianRoutes,
  // ...analystRoutes,
  // ...userRoutes,

  /**
   * Ruta catch-all: si no se encuentra la ruta, redirige a login.
   * Puedes reemplazar esto con un componente 404 personalizado si lo deseas.
   */
  { path: '**', redirectTo: 'login' }
];
