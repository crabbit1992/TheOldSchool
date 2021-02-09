import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptPlanillaNotasComponent } from './modal-opt-planilla-notas.component';

describe('ModalOptPlanillaNotasComponent', () => {
  let component: ModalOptPlanillaNotasComponent;
  let fixture: ComponentFixture<ModalOptPlanillaNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptPlanillaNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptPlanillaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
