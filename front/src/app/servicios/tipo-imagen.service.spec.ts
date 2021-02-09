import { TestBed } from '@angular/core/testing';

import { TipoImagenService } from './tipo-imagen.service';

describe('TipoImagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoImagenService = TestBed.get(TipoImagenService);
    expect(service).toBeTruthy();
  });
});
