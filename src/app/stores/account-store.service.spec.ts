import { TestBed, inject } from '@angular/core/testing';

import { AccountStoreService } from './account-store.service';

describe('AccountStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountStoreService]
    });
  });

  it('should be created', inject([AccountStoreService], (service: AccountStoreService) => {
    expect(service).toBeTruthy();
  }));
});
