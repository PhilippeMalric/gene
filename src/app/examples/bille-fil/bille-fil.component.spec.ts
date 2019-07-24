import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleFilComponent } from './bille-fil.component';

describe('BilleFilComponent', () => {
  let component: BilleFilComponent;
  let fixture: ComponentFixture<BilleFilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleFilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleFilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
