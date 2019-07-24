import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteReviewComponent } from './vote-review.component';

describe('VoteReviewComponent', () => {
  let component: VoteReviewComponent;
  let fixture: ComponentFixture<VoteReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
