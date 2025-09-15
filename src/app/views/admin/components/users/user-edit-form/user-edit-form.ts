// // src/app/dashboards/admin/components/user/user-edit-form/user-edit-form.ts
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { UserModel } from '../../../../../core/models/ui/user.model';
// import { RoleDTO } from '../../../../../core/models/dto/role.dto';
// import { ZoneDTO } from '../../../../../core/models/dto/zone.dto';

// @Component({
//   selector: 'app-user-edit-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './user-edit-form.html',
//   styleUrls: ['./user-edit-form.scss'],
// })
// export class UserEditFormComponent {
//   @Input() editingUser!: UserModel;
//   @Input() roles!: RoleDTO[];
//   @Input() availableZones!: ZoneDTO[];
//   @Input() editingUserZoneIds!: string[];

//   @Output() cancelEdit = new EventEmitter<void>();
//   @Output() saveUserChanges = new EventEmitter<void>();
//   @Output() onZoneToggle = new EventEmitter<string>();
// }
