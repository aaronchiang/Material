import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavExportComponent } from './nav-export.component';

describe('NavExportComponent', () => {
  let component: NavExportComponent;
  let fixture: ComponentFixture<NavExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
