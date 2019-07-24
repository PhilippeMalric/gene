import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { VotesService } from '../votes.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'anms-vote-review',
  templateUrl: './vote-review.component.html',
  styleUrls: ['./vote-review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteReviewComponent implements OnInit {

  @Input() userId;
  @Input() bookId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: VotesService) { }

  ngOnInit() {
    this.stars = this.starService.getBookStars(this.bookId)

    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    }))
  }
  starHandler(value) {
    this.starService.setStar(this.userId, this.bookId, value,"")
  }
}
