import { TestBed } from '@angular/core/testing';

import { JsonPantallaGrupoService } from './json-pantalla-grupo.service';

describe('JsonPantallaGrupoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonPantallaGrupoService = TestBed.get(JsonPantallaGrupoService);
    expect(service).toBeTruthy();
  });
});
