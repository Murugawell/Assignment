import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating;
  ratings = Array(5).fill(0);
  constructor() { }

  ngOnInit() {
    for (let index = 0; index < this.rating; index++) {
      this.ratings[index] = 1;

    }
  }

}
