import { TestBed } from '@angular/core/testing';

import { PromedioService } from './promedio.service';

describe('PromedioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromedioService = TestBed.get(PromedioService);
    expect(service).toBeTruthy();
  });
});
