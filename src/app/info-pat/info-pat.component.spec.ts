import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPatComponent } from './info-pat.component';

describe('InfoPatComponent', () => {
  let component: InfoPatComponent;
  let fixture: ComponentFixture<InfoPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
