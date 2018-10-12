import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsideCompanyDetailsComponent } from './studentside-company-details.component';

describe('StudentsideCompanyDetailsComponent', () => {
  let component: StudentsideCompanyDetailsComponent;
  let fixture: ComponentFixture<StudentsideCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsideCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsideCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
