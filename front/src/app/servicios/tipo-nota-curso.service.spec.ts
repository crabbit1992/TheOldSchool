import { TestBed } from '@angular/core/testing';

import { TipoNotaCursoService } from './tipo-nota-curso.service';

describe('TipoNotaCursoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoNotaCursoService = TestBed.get(TipoNotaCursoService);
    expect(service).toBeTruthy();
  });
});
