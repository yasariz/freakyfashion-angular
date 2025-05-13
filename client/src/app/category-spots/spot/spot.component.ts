import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spot',
  imports: [CommonModule],
  templateUrl: './spot.component.html',
  styleUrl: './spot.component.css'
})
export class SpotComponent {
  @Input() image!: string;
  @Input() text!: string;
  @Input() link!: string;
}
