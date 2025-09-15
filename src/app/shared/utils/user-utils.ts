// src/app/shared/utils/user-utils.ts

import { Injectable } from '@angular/core';
import { RoleModel } from '../../core/models/ui/role.model';
import { UserModel } from '../../core/models/ui/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserUtilsService {
  getRoleLabel(roleId: string, roles: RoleModel[]): string {
    const role = roles.find((r) => r.roleId === roleId);
    return role ? role.roleName : 'Sin rol';
  }

  getUserZonesLabel(user: UserModel): string {
    if (!user.zones || user.zones.length === 0) return 'Sin zonas asignadas';
    return user.zones.map((z) => z.zoneName).join(', ');
  }
}
