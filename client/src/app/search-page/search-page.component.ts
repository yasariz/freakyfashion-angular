import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CtaComponent } from '../cta/cta.component';
import { CategoryComponent } from '../category/category.component';
import { ProductsComponent } from "../products/products.component";
import { FooterComponent } from '../footer/footer.component';
import { InformationComponent } from '../information/information.component';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  imports: [RouterLink, CommonModule, HeaderComponent, InformationComponent, FooterComponent]
})
export class SearchPageComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'] || '';
      if (this.searchTerm) {
        this.searchProducts(this.searchTerm);
      }
    });
  }

  searchProducts(searchTerm: string): void {
    this.productService.searchProducts(searchTerm).subscribe((data: Product[]) => {
      this.products = data;
      this.loading = false;  // Stop loading after data is fetched
    });
  }
}
