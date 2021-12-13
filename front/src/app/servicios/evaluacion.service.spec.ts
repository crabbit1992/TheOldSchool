import { TestBed } from '@angular/core/testing';

import { EvaluacionService } from './evaluacion.service';

describe('EvaluacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionService = TestBed.get(EvaluacionService);
    expect(service).toBeTruthy();
  });
});
