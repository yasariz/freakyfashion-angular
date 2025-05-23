import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { InformationComponent } from "../information/information.component";
import { ProductsComponent } from "../products/products.component";
import { CategoryComponent } from "../category/category.component";
import { CtaComponent } from "../cta/cta.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SpotsComponent } from '../category-spots/spots/spots.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FooterComponent, InformationComponent, ProductsComponent, CtaComponent, HeaderComponent, SpotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
