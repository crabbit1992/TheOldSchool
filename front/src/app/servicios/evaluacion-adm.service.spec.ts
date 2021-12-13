import { TestBed } from '@angular/core/testing';

import { EvaluacionAdmService } from './evaluacion-adm.service';

describe('EvaluacionAdmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionAdmService = TestBed.get(EvaluacionAdmService);
    expect(service).toBeTruthy();
  });
});
