import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsideUpcomingCompanyComponent } from './studentside-upcoming-company.component';

describe('StudentsideUpcomingCompanyComponent', () => {
  let component: StudentsideUpcomingCompanyComponent;
  let fixture: ComponentFixture<StudentsideUpcomingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsideUpcomingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsideUpcomingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
