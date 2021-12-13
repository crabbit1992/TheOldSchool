import { TestBed } from '@angular/core/testing';

import { SubTemaService } from './sub-tema.service';

describe('SubTemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubTemaService = TestBed.get(SubTemaService);
    expect(service).toBeTruthy();
  });
});
