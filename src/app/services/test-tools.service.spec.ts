import { TestBed, inject } from '@angular/core/testing';

import { TestToolsService } from './test-tools.service';

describe('TestToolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestToolsService]
    });
  });

  it('should be created', inject([TestToolsService], (service: TestToolsService) => {
    expect(service).toBeTruthy();
  }));
});
