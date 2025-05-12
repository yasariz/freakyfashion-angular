import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CtaComponent } from './cta/cta.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from "./products/products.component";
import { FooterComponent } from './footer/footer.component';
import { InformationComponent } from './information/information.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  }

