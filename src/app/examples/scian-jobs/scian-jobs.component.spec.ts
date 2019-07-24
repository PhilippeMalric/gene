import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScianJobsComponent } from './scian-jobs.component';

describe('ScianJobsComponent', () => {
  let component: ScianJobsComponent;
  let fixture: ComponentFixture<ScianJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScianJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScianJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
