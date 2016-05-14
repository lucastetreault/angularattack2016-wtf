import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { PullsService } from './pulls.service';

describe('Pulls Service', () => {
  beforeEachProviders(() => [PullsService]);

  it('should ...',
      inject([PullsService], (service: PullsService) => {
    expect(service).toBeTruthy();
  }));
});
