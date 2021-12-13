import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroEvalucionComponent } from './libro-evalucion.component';

describe('LibroEvalucionComponent', () => {
  let component: LibroEvalucionComponent;
  let fixture: ComponentFixture<LibroEvalucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibroEvalucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroEvalucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
