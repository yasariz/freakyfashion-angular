import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      // Navigate to the correct search page URL
      this.router.navigate(['/products/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}
