import { TestBed } from '@angular/core/testing';

import { TipoPeriodoService } from './tipo-periodo.service';

describe('TipoPeriodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoPeriodoService = TestBed.get(TipoPeriodoService);
    expect(service).toBeTruthy();
  });
});
