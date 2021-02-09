import { TestBed } from '@angular/core/testing';

import { MatriculaService } from './matricula.service';

describe('MatriculaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatriculaService = TestBed.get(MatriculaService);
    expect(service).toBeTruthy();
  });
});
