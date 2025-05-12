// app/admin/admin-routing.module.ts
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'management', component: AdminManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
