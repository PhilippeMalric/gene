import { async, ComponentFixture, TestBed } from '@app/examples/cnp-scian/node_modules/@angular/core/testing';

import { CnpScianComponent } from './cnp-scian.component';

describe('CnpScianComponent', () => {
  let component: CnpScianComponent;
  let fixture: ComponentFixture<CnpScianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnpScianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnpScianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
