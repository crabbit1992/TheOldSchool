import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptMatriculaComponent } from './modal-opt-matricula.component';

describe('ModalOptMatriculaComponent', () => {
  let component: ModalOptMatriculaComponent;
  let fixture: ComponentFixture<ModalOptMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
