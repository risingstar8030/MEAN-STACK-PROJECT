import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouslyPlacedStudentsComponent } from './previously-placed-students.component';

describe('PreviouslyPlacedStudentsComponent', () => {
  let component: PreviouslyPlacedStudentsComponent;
  let fixture: ComponentFixture<PreviouslyPlacedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviouslyPlacedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviouslyPlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
