import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInfComponent } from './info-inf.component';

describe('InfoInfComponent', () => {
  let component: InfoInfComponent;
  let fixture: ComponentFixture<InfoInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
