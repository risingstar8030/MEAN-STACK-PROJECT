import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsidePreviousCompaniesComponent } from './studentside-previous-companies.component';

describe('StudentsidePreviousCompaniesComponent', () => {
  let component: StudentsidePreviousCompaniesComponent;
  let fixture: ComponentFixture<StudentsidePreviousCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsidePreviousCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsidePreviousCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
