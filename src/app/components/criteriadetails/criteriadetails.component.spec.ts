import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriadetailsComponent } from './criteriadetails.component';

describe('CriteriadetailsComponent', () => {
  let component: CriteriadetailsComponent;
  let fixture: ComponentFixture<CriteriadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriadetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
