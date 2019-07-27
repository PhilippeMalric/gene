import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayExpressExpComponent } from './array-express-exp.component';

describe('ArrayExpressExpComponent', () => {
  let component: ArrayExpressExpComponent;
  let fixture: ComponentFixture<ArrayExpressExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayExpressExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayExpressExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
