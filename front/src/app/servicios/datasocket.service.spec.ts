import { TestBed } from '@angular/core/testing';

import { DatasocketService } from './datasocket.service';

describe('DatasocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasocketService = TestBed.get(DatasocketService);
    expect(service).toBeTruthy();
  });
});
