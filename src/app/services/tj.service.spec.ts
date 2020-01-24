import { TestBed } from '@angular/core/testing';

import { TjService } from './tj.service';

describe('TjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TjService = TestBed.get(TjService);
    expect(service).toBeTruthy();
  });
});
