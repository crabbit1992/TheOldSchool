import { TestBed } from '@angular/core/testing';

import { PlanillaNotasService } from './planilla-notas.service';

describe('PlanillaNotasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanillaNotasService = TestBed.get(PlanillaNotasService);
    expect(service).toBeTruthy();
  });
});
