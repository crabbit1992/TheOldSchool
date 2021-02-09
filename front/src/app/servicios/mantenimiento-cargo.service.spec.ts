import { TestBed } from '@angular/core/testing';

import { MantenimientoCargoService } from './mantenimiento-cargo.service';

describe('MantenimientoCargoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MantenimientoCargoService = TestBed.get(MantenimientoCargoService);
    expect(service).toBeTruthy();
  });
});
