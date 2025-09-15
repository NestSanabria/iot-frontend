// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { environment } from '../environments/environments';
import { routes } from './app.routes';

// Importa el interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    // Habilita interceptores desde el DI
    provideHttpClient(withInterceptorsFromDi()),

    // Aquí registras tu clase interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    provideHotToastConfig({
      position: 'top-right',
      duration: 3000,
      dismissible: true,
      style: {
        background: 'linear-gradient(135deg, #222428, #1e1e1e)',
        color: '#c7c4b0',
        border: '1px solid rgb(194, 183, 91)',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(204, 190, 100, 0.54)',
        fontWeight: '500',
      },
    }),
  ],
};
