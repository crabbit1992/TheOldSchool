import { TestBed } from '@angular/core/testing';

import { HorarioService } from './horario.service';

describe('HorarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioService = TestBed.get(HorarioService);
    expect(service).toBeTruthy();
  });
});
