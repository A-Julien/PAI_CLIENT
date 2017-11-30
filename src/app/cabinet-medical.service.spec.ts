import { TestBed, inject } from '@angular/core/testing';

import { CabinetMedicalModuleService } from './cabinet-medical.service';

describe('CabinetMedicalModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinetMedicalModuleService]
    });
  });

  it('should be created', inject([CabinetMedicalModuleService], (service: CabinetMedicalModuleService) => {
    expect(service).toBeTruthy();
  }));
});
