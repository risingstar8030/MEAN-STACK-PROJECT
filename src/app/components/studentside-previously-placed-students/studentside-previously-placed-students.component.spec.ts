import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsidePreviouslyPlacedStudentsComponent } from './studentside-previously-placed-students.component';

describe('StudentsidePreviouslyPlacedStudentsComponent', () => {
  let component: StudentsidePreviouslyPlacedStudentsComponent;
  let fixture: ComponentFixture<StudentsidePreviouslyPlacedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsidePreviouslyPlacedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsidePreviouslyPlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
