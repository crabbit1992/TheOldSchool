import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptCursoComponent } from './modal-opt-curso.component';

describe('ModalOptCursoComponent', () => {
  let component: ModalOptCursoComponent;
  let fixture: ComponentFixture<ModalOptCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
