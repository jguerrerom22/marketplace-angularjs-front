import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorysComponent } from './storys.component';

describe('StorysComponent', () => {
  let component: StorysComponent;
  let fixture: ComponentFixture<StorysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
