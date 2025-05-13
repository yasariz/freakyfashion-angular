import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Spot1Component } from '../cta-spots/spot1/spot1.component';
import { Spot2Component } from '../cta-spots/spot2/spot2.component';
import { Spot3Component } from '../cta-spots/spot3/spot3.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent implements OnInit, OnDestroy {
  spots = [new Spot1Component(), new Spot2Component(), new Spot3Component()];
  currentSpotIndex = 0;
  intervalId: any;

  get currentSpot() {
    return this.spots[this.currentSpotIndex];
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentSpotIndex = (this.currentSpotIndex + 1) % this.spots.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
