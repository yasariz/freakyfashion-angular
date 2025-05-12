import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule]
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];  // New array for limited products
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.displayedProducts = this.products.slice(0, 5);  // Optional: limit to show
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load products', err);
        this.loading = false;
      }
    });
  }
}
