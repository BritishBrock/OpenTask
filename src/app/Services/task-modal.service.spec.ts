import { TestBed } from '@angular/core/testing';

import { TaskModalService } from './task-modal.service';

describe('TaskModalService', () => {
  let service: TaskModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
