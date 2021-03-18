import { TestBed } from '@angular/core/testing';

import { TipoPagoService } from './tipo-pago.service';

describe('TipoPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoPagoService = TestBed.get(TipoPagoService);
    expect(service).toBeTruthy();
  });
});
