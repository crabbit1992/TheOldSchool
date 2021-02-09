import { TestBed } from '@angular/core/testing';

import { CienciaService } from './ciencia.service';

describe('CienciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CienciaService = TestBed.get(CienciaService);
    expect(service).toBeTruthy();
  });
});
