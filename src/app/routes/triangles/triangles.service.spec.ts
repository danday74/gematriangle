import { TestBed } from '@angular/core/testing'
import { TrianglesService } from './triangles.service'

describe('TrianglesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: TrianglesService = TestBed.get(TrianglesService)
    expect(service).toBeTruthy()
  })
})
