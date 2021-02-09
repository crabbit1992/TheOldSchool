import { TestBed } from '@angular/core/testing';

import { MntAdminCrabbService } from './mnt-admin-crabb.service';

describe('MntAdminCrabbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MntAdminCrabbService = TestBed.get(MntAdminCrabbService);
    expect(service).toBeTruthy();
  });
});
