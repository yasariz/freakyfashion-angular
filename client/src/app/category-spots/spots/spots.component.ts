import { Component } from '@angular/core';
import { SpotComponent } from '../spot/spot.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spots',
  imports: [SpotComponent, CommonModule],
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css'
})
export class SpotsComponent {
  spots = [
    { image: 'images/item1.jpg', text: '50% på utvalda parfymer', link: '/spot1' },
    { image: 'images/item2.jpg', text: 'Missa inte!', link: '/spot2' },
    { image: 'images/item3.jpg', text: 'Upptäck Kollektionen', link: '/spot3' },
  ];
}
