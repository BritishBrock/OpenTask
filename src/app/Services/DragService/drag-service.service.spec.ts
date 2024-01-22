import { TestBed } from '@angular/core/testing';

import { DragServiceService } from './drag-service.service';

describe('DragServiceService', () => {
  let service: DragServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
