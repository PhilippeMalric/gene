import { TestBed } from '@angular/core/testing';

import { ArrayExpressExpService } from './array-express-exp.service';

describe('ArrayExpressExpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrayExpressExpService = TestBed.get(ArrayExpressExpService);
    expect(service).toBeTruthy();
  });
});
