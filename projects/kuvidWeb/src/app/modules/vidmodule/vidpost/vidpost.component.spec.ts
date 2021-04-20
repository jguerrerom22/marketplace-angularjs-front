import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidpostComponent } from './vidpost.component';

describe('VidpostComponent', () => {
  let component: VidpostComponent;
  let fixture: ComponentFixture<VidpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
