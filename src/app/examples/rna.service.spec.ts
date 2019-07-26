import { TestBed } from '@angular/core/testing';

import { RnaService } from './rna.service';

describe('RnaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RnaService = TestBed.get(RnaService);
    expect(service).toBeTruthy();
  });
});
