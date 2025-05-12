import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminManagementComponent {
  // Predefined category list
  categories: string[] = ['T-Shirt', 'Hoodie', 'Byxor', 'Skor', 'Parfym', 'Accessoarer'];

  // The product object
  product: Product = {
    title: '',
    description: '',
    image: null,  // Image is either a file or null
    sku: '',
    price: 0,
    category: [],  // Array to hold multiple categories
    id: 0,
    urlSlug: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router  // Injecting Router
  ) {}

  // Handle category change when checkboxes are selected/deselected
  toggleCategory(category: string) {
    const index = this.product.category.indexOf(category);
    if (index === -1) {
      this.product.category.push(category); // Add category
    } else {
      this.product.category.splice(index, 1); // Remove category
    }
  }

  // Handle file input change
  onFileSelected(event: any) {
    this.product.image = event.target.files[0];
  }

  // Submit the product with FormData
  submitProduct() {
    const formData = new FormData();

    // Append basic fields
    formData.append('title', this.product.title);
    formData.append('description', this.product.description);
    formData.append('sku', this.product.sku);
    formData.append('price', this.product.price.toString());

    // Ensure urlSlug is correctly set
    this.product.urlSlug = this.product.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    formData.append('urlSlug', this.product.urlSlug);

    // Fix category by joining them into a single string
    const categoryString = this.product.category.join(',');
    formData.append('category', categoryString);

    // Append the selected image file (if any)
    if (this.product.image) {
      formData.append('image', this.product.image);
    }

    // Call the service to add the product
    this.productService.addProduct(formData).subscribe({
      next: () => {
        // Reset the form
        this.product = {
          title: '',
          description: '',
          image: null,
          sku: '',
          price: 0,
          category: [],
          id: 0,
          urlSlug: ''
        };

        // Navigate to /admin
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Could not add product.'); // <-- this will show even if status 201 was misread
      }
    });



  }
}
