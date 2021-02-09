import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptInicioComponent } from './modal-opt-inicio.component';

describe('ModalOptInicioComponent', () => {
  let component: ModalOptInicioComponent;
  let fixture: ComponentFixture<ModalOptInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
