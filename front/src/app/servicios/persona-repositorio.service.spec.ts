import { TestBed } from '@angular/core/testing';

import { PersonaRepositorioService } from './persona-repositorio.service';

describe('PersonaRepositorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaRepositorioService = TestBed.get(PersonaRepositorioService);
    expect(service).toBeTruthy();
  });
});
