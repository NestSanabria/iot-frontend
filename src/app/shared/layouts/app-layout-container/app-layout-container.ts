// src/app/shared/layouts/app-layout-container.ts

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar";
import { SidebarComponent, SidebarLink } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './app-layout-container.html',
  styleUrls: ['./app-layout-container.scss'],
})
export class AppLayoutContainerComponent {
  @Input() isSidebarCollapsed = false;
  @Output() isSidebarCollapsedChange = new EventEmitter<boolean>();

  @Input() sidebarLinks: SidebarLink[] = [];

  isMobile = false;
  isMobileSidebarOpen = false;

  constructor() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isMobileSidebarOpen = false;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isSidebarCollapsedChange.emit(this.isSidebarCollapsed);
    }
  }

  onSidebarCollapseChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
    this.isSidebarCollapsedChange.emit(collapsed);
  }
}
