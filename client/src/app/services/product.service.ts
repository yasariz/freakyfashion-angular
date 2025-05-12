import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}


  // Get product by ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/slug/${slug}`);
  }


  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }


  // Get 8 random products
  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/random`);
  }


  // Add new product
  addProduct(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/api/admin/products/new', formData);
  }

  getThreeRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8000/api/products/random/3');
  }


  // Search Bar Function
  searchProducts(searchTerm: string): Observable<Product[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
  }


}
