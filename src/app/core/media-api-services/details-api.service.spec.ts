import { TestBed } from '@angular/core/testing';

import { DetailsApiService } from './details-api.service';

describe('DetailsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsApiService = TestBed.get(DetailsApiService);
    expect(service).toBeTruthy();
  });
});
