import { TestBed } from '@angular/core/testing';

import { NivelService } from './nivel.service';

describe('NivelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NivelService = TestBed.get(NivelService);
    expect(service).toBeTruthy();
  });
});
