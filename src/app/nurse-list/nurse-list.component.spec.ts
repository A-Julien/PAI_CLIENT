import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseListComponent } from './nurse-list.component';

describe('NurseListComponent', () => {
  let component: NurseListComponent;
  let fixture: ComponentFixture<NurseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
