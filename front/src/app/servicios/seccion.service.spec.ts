import { TestBed } from '@angular/core/testing';

import { SeccionService } from './seccion.service';

describe('SeccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeccionService = TestBed.get(SeccionService);
    expect(service).toBeTruthy();
  });
});
