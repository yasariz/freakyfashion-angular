import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [RouterLink, CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
loading: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRandomProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        console.log('Homepage Products:', this.products);
      },
      error: (err: any) => {
        console.error('Error fetching homepage products', err);
      }
    });
  }
}
