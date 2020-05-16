import { TestBed } from '@angular/core/testing';

import { BackToTopService } from './back-to-top.service';

describe('BackToTopService', () => {
  let service: BackToTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackToTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
