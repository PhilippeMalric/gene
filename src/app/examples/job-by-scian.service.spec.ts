import { TestBed } from '@angular/core/testing';

import { JobByScianService } from './job-by-scian.service';

describe('JobByScianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobByScianService = TestBed.get(JobByScianService);
    expect(service).toBeTruthy();
  });
});
