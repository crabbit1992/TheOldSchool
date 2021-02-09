import { TestBed } from '@angular/core/testing';

import { PerfilColegioService } from './perfil-colegio.service';

describe('PerfilColegioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilColegioService = TestBed.get(PerfilColegioService);
    expect(service).toBeTruthy();
  });
});
