import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduvidComponent } from './eduvid.component';

describe('EduvidComponent', () => {
  let component: EduvidComponent;
  let fixture: ComponentFixture<EduvidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduvidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduvidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
