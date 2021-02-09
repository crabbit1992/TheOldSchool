import { TestBed } from '@angular/core/testing';

import { HistorialRegistroService } from './historial-registro.service';

describe('HistorialRegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistorialRegistroService = TestBed.get(HistorialRegistroService);
    expect(service).toBeTruthy();
  });
});
