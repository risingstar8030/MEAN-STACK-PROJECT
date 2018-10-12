import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsideCompanyComponent } from './studentside-company.component';

describe('StudentsideCompanyComponent', () => {
  let component: StudentsideCompanyComponent;
  let fixture: ComponentFixture<StudentsideCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsideCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsideCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
