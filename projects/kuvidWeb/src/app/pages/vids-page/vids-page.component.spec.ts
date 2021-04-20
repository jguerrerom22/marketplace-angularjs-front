import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidsPageComponent } from './vids-page.component';

describe('VidsPageComponent', () => {
  let component: VidsPageComponent;
  let fixture: ComponentFixture<VidsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
