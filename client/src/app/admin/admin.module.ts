// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminDashboardComponent,     // ✅ import standalone component
    AdminManagementComponent     // ✅ import standalone component
  ]
})
export class AdminModule {}
