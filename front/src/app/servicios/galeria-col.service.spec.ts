import { TestBed } from '@angular/core/testing';

import { GaleriaColService } from './galeria-col.service';

describe('GaleriaColService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaleriaColService = TestBed.get(GaleriaColService);
    expect(service).toBeTruthy();
  });
});
