import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { InformationComponent } from "../information/information.component";
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';  // RouterModule imported correctly
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FooterComponent, InformationComponent, RouterModule, CommonModule, HeaderComponent],  // RouterModule is standalone
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  randomProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.fetchProductDetails(slug);
      }
    });

    this.productService.getThreeRandomProducts().subscribe({
      next: (products) => {
        this.randomProducts = products;
      },
      error: (err) => {
        console.error('Error fetching 3 random products:', err);
      }
    });
  }

  private fetchProductDetails(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  onRelatedProductClick(slug: string): void {
    // When a related product is clicked, navigate to its details page
    this.router.navigate(['/product', slug]);
  }
}
