import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsigninComponent } from './studentsignin.component';

describe('StudentsigninComponent', () => {
  let component: StudentsigninComponent;
  let fixture: ComponentFixture<StudentsigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
