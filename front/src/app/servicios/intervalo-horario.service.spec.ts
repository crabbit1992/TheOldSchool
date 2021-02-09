import { TestBed } from '@angular/core/testing';

import { IntervaloHorarioService } from './intervalo-horario.service';

describe('IntervaloHorarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntervaloHorarioService = TestBed.get(IntervaloHorarioService);
    expect(service).toBeTruthy();
  });
});
