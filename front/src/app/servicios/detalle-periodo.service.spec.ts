import { TestBed } from '@angular/core/testing';

import { DetallePeriodoService } from './detalle-periodo.service';

describe('DetallePeriodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallePeriodoService = TestBed.get(DetallePeriodoService);
    expect(service).toBeTruthy();
  });
});
