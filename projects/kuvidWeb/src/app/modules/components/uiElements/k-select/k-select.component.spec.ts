import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KSelectComponent } from './k-select.component';

describe('KSelectComponent', () => {
  let component: KSelectComponent;
  let fixture: ComponentFixture<KSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
