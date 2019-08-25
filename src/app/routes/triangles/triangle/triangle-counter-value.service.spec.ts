import { TestBed } from '@angular/core/testing'
import { TriangleCounterValueService } from './triangle-counter-value.service'

describe('TriangleCounterValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: TriangleCounterValueService = TestBed.get(TriangleCounterValueService)
    expect(service).toBeTruthy()
  })
})
