import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetailsComponent } from './companydetails.component';

describe('CompanydetailsComponent', () => {
  let component: CompanydetailsComponent;
  let fixture: ComponentFixture<CompanydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
