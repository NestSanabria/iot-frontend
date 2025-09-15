// src/app/views/unauthorized/unauthorized.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-page">
      <h1>403 - Acceso denegado</h1>
      <p>No tienes permisos para acceder a esta sección.</p>
    </div>
  `,
  styles: [`
    .unauthorized-page {
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class UnauthorizedComponent {}
