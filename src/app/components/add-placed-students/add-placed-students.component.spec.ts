import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacedStudentsComponent } from './add-placed-students.component';

describe('AddPlacedStudentsComponent', () => {
  let component: AddPlacedStudentsComponent;
  let fixture: ComponentFixture<AddPlacedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlacedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
