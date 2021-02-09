import { TestBed } from '@angular/core/testing';

import { TurnoService } from './turno.service';

describe('TurnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurnoService = TestBed.get(TurnoService);
    expect(service).toBeTruthy();
  });
});
