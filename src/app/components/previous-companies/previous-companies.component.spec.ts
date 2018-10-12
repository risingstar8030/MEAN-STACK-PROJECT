import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousCompaniesComponent } from './previous-companies.component';

describe('PreviousCompaniesComponent', () => {
  let component: PreviousCompaniesComponent;
  let fixture: ComponentFixture<PreviousCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
