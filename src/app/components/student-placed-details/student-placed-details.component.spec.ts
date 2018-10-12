import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPlacedDetailsComponent } from './student-placed-details.component';

describe('StudentPlacedDetailsComponent', () => {
  let component: StudentPlacedDetailsComponent;
  let fixture: ComponentFixture<StudentPlacedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPlacedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPlacedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
