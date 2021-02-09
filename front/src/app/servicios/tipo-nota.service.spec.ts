import { TestBed } from '@angular/core/testing';

import { TipoNotaService } from './tipo-nota.service';

describe('TipoNotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoNotaService = TestBed.get(TipoNotaService);
    expect(service).toBeTruthy();
  });
});
