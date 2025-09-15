// src/app/shared/components/sidebar/sidebar.ts

import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarLink {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarLink[];
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  @Input() links: SidebarLink[] = [];
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsed = false;
  isOpenMap: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collapsed']) {
      this.isCollapsed = this.collapsed;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  handleSectionClick(label: string): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.collapsedChange.emit(this.isCollapsed);
    }
    this.toggleSection(label);
  }

  handleLinkClick(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.collapsedChange.emit(this.isCollapsed);
    }
  }

  toggleSection(label: string): void {
    this.isOpenMap[label] = !this.isOpenMap[label];
  }
}
