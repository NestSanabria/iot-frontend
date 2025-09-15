// src/app/features/home/pages/home/home.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, LoginResponse } from '../../../app/core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  userData$: Observable<LoginResponse | null>;

  constructor(private authService: AuthService) {
    this.userData$ = this.authService.userData$;
  }
}
