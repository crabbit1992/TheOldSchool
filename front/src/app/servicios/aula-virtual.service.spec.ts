import { TestBed } from '@angular/core/testing';

import { AulaVirtualService } from './aula-virtual.service';

describe('AulaVirtualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AulaVirtualService = TestBed.get(AulaVirtualService);
    expect(service).toBeTruthy();
  });
});
