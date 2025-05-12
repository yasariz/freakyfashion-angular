import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchPageComponent } from './search-page/search-page.component';

export const routes: Routes = [
  // Admin Routes
  { path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', component: HomeComponent },
  { path: 'product/:slug', component: ProductDetailsComponent },
  { path: 'products/search', component: SearchPageComponent },

];
