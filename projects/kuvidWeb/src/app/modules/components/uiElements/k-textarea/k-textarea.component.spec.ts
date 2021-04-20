import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KTextareaComponent } from './k-textarea.component';

describe('KTextareaComponent', () => {
  let component: KTextareaComponent;
  let fixture: ComponentFixture<KTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
