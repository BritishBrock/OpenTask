import { TestBed } from '@angular/core/testing';

import { TaskViewerBoardService } from './task-viewer-board.service';

describe('TaskViewerBoardService', () => {
  let service: TaskViewerBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskViewerBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
