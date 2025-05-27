import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment'; // import environment

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;  // use environment.apiUrl

  constructor(private http: HttpClient) {}

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/slug/${slug}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/random`);
  }

  addProduct(formData: FormData): Observable<any> {
    // Use environment.apiUrl here too for admin routes
    return this.http.post(`${environment.apiUrl}/admin/products/new`, formData);
  }

  getThreeRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/random/3`);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
  }
}
