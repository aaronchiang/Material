import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAnalyticsComponent } from './web-analytics.component';

describe('WebAnalyticsComponent', () => {
  let component: WebAnalyticsComponent;
  let fixture: ComponentFixture<WebAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
