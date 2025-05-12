import { Component } from '@angular/core';

@Component({
  selector: 'app-spot2',
  imports: [],
  templateUrl: './spot2.component.html',
  styleUrl: './spot2.component.css'
})
export class Spot2Component {
  image = '/images/spot-image-2.webp';
  text = 'Fri frakt på alla beställningar';
  link = '/fri-frakt';
}
