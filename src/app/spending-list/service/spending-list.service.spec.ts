import { TestBed } from '@angular/core/testing';

import { SpendingListService } from './spending-list.service';

describe('SpendingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpendingListService = TestBed.get(SpendingListService);
    expect(service).toBeTruthy();
  });
});
