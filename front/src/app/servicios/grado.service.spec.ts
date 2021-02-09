import { TestBed } from '@angular/core/testing';

import { GradoService } from './grado.service';

describe('GradoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradoService = TestBed.get(GradoService);
    expect(service).toBeTruthy();
  });
});
