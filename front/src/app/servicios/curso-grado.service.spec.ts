import { TestBed } from '@angular/core/testing';

import { CursoGradoService } from './curso-grado.service';

describe('CursoGradoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoGradoService = TestBed.get(CursoGradoService);
    expect(service).toBeTruthy();
  });
});
