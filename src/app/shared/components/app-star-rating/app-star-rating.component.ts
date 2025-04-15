import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './app-star-rating.component.html',
  styleUrl: './app-star-rating.component.css'
})
export class AppStarRatingComponent {
  @Input() maxStars = 5;
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  setRating(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }
}
