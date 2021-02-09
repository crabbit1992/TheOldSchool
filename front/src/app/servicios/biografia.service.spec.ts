import { TestBed } from '@angular/core/testing';

import { BiografiaService } from './biografia.service';

describe('BiografiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiografiaService = TestBed.get(BiografiaService);
    expect(service).toBeTruthy();
  });
});
