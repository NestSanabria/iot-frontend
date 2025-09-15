// // src/app/features/admin/pages/user-management/components/user-list/user-list.ts

// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IUser } from '../../../../../../core/models/user.model';

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './user-list.html',
//   styleUrls: ['./user-list.scss']
// })
// export class UserListComponent {
//   @Input() users: IUser[] = [];
//   @Input() getRoleLabel!: (roleId: string) => string;
//   @Input() getUserZonesLabel!: (user: IUser) => string;

//   @Output() editUser = new EventEmitter<IUser>();
//   @Output() deleteUser = new EventEmitter<string>();
// }
