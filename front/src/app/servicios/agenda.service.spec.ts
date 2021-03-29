import { TestBed } from '@angular/core/testing';

import { AgendaService } from './agenda.service';

describe('AgendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendaService = TestBed.get(AgendaService);
    expect(service).toBeTruthy();
  });
});
