import { TestBed } from '@angular/core/testing';

import { AulaCursoService } from './aula-curso.service';

describe('AulaCursoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AulaCursoService = TestBed.get(AulaCursoService);
    expect(service).toBeTruthy();
  });
});
