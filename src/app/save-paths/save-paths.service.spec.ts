import { TestBed } from '@angular/core/testing';

import { SavePathsService } from './save-paths.service';

describe('SavePathsService', () => {
  let service: SavePathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
