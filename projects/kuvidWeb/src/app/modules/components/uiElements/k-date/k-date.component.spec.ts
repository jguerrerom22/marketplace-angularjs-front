import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KDateComponent } from './k-date.component';

describe('KDateComponent', () => {
  let component: KDateComponent;
  let fixture: ComponentFixture<KDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
