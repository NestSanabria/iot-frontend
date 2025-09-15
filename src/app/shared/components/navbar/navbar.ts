// src/app/shared/components/navbar/navbar.ts

import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  userData$ = this.authService.userData$;

  // Observable para ocultar navbar en rutas específicas (p.ej. login)
  hideNavbar$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router.url.includes('/login')),
    startWith(this.router.url.includes('/login'))
  );

  isDarkMode = false;

  // Control de scroll para ocultar/mostrar navbar
  private lastScrollTop = 0;
  isCollapsed = false; // true = navbar oculto (colapsado)

  // Título dinámico que se muestra en navbar-center (p.ej. 'Usuarios', 'Dashboard')
  pageTitle = '';

  // Título personalizado mostrado en el HTML
  get displayTitle(): string {
    const titleMap: Record<string, string> = {
      'Usuarios': 'Gestión de usuarios',
      'Roles': 'Gestión de roles',
      'Permisos': 'Gestión de permisos',
      'Zonas': 'Gestión de zonas',
      'Dispositivos': 'Gestión de dispositivos',
      'Dashboard': 'Panel de control'
    };

    return titleMap[this.pageTitle] || this.pageTitle;
  }

  ngOnInit() {
    // Cargar modo oscuro desde localStorage o sistema operativo
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      this.isDarkMode = saved === 'true';
    } else {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateBodyClass();

    // Detectar cambio de ruta para actualizar título dinámico
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updatePageTitle(event.urlAfterRedirects);
    });

    // Inicializar título en carga
    this.updatePageTitle(this.router.url);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  private updateBodyClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  logout(): void {
    this.authService.logout().subscribe((res) => {
      if (res && 'error' in res) {
        this.toast.error(`Error al cerrar sesión: ${res.error}`);
      } else {
        this.toast.success('Sesión cerrada');
        this.router.navigateByUrl('/login');
      }
    });
  }

  // Actualiza el título de la página según la ruta actual
  private updatePageTitle(url: string) {
    // Mapas rutas admin a títulos amigables
    const adminTitles: Record<string, string> = {
      '/admin/dashboard': 'Dashboard',
      '/admin/usuarios': 'Usuarios',
      '/admin/permisos': 'Permisos',
      '/admin/roles': 'Roles',
      '/admin/zonas': 'Zonas',
      '/admin/dispositivos': 'Dispositivos'
    };

    // Si la ruta empieza con /admin, usar título dinámico
    if (url.startsWith('/admin')) {
      this.pageTitle = adminTitles[url] || 'Administración';
    } else {
      // Para otras rutas o roles, muestra título genérico o adaptado
      this.pageTitle = 'IoT App';
    }
  }

  // Detectar scroll para ocultar/mostrar navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  onMouseEnter() {
    this.isCollapsed = false;
  }

  onMouseLeave() {
    if (window.pageYOffset > 100) {
      this.isCollapsed = true;
    }
  }
}
