// src/main.ts

// Importa la función bootstrapApplication desde el paquete @angular/platform-browser.
// Esta función se usa para arrancar aplicaciones standalone (sin módulo raíz como AppModule).
import { bootstrapApplication } from '@angular/platform-browser';

// Importa el componente raíz de la aplicación.
// Este componente es el que se monta sobre el <app-root> en el index.html.
import { AppComponent } from './app/app';

// Importa la configuración de la aplicación, que normalmente incluye proveedores (services), enrutadores, etc.
import { appConfig } from './app/app.config';

// Llama a bootstrapApplication para iniciar la aplicación Angular.
// App será el punto de entrada visual (raíz de la UI).
// Se le pasa la configuración (spread de appConfig) como segundo argumento.
bootstrapApplication(AppComponent, {
  ...appConfig,

  // Asegura que los proveedores estén presentes incluso si appConfig.providers está indefinido.
  providers: [...(appConfig.providers || [])],
})

// Manejo de errores: si ocurre algún problema al arrancar la app, se loguea en la consola.
.catch((err) => console.error(err));
