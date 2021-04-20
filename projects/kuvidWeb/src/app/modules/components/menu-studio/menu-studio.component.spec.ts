import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStudioComponent } from './menu-studio.component';

describe('MenuStudioComponent', () => {
  let component: MenuStudioComponent;
  let fixture: ComponentFixture<MenuStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
