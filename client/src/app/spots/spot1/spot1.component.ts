import { Component } from '@angular/core';

@Component({
  selector: 'app-spot1',
  imports: [],
  templateUrl: './spot1.component.html',
  styleUrl: './spot1.component.css'
})
export class Spot1Component {
  image = '/images/spot-image-1.webp'
  text = 'Upptäck det senaste från den Italienska modejätten GUCCI!'
  link = '/products/search?q=Gucci'
}
