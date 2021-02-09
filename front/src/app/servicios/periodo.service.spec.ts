import { TestBed } from '@angular/core/testing';

import { PeriodoService } from './periodo.service';

describe('PeriodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodoService = TestBed.get(PeriodoService);
    expect(service).toBeTruthy();
  });
});
