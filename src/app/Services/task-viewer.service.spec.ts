import { TestBed } from '@angular/core/testing';

import { TaskViewerService } from './task-viewer.service';

describe('TaskViewerService', () => {
  let service: TaskViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
