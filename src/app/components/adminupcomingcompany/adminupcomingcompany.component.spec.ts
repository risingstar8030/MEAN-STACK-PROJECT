import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupcomingcompanyComponent } from './adminupcomingcompany.component';

describe('AdminupcomingcompanyComponent', () => {
  let component: AdminupcomingcompanyComponent;
  let fixture: ComponentFixture<AdminupcomingcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminupcomingcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminupcomingcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
