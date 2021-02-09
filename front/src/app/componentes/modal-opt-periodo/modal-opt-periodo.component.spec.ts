import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptPeriodoComponent } from './modal-opt-periodo.component';

describe('ModalOptPeriodoComponent', () => {
  let component: ModalOptPeriodoComponent;
  let fixture: ComponentFixture<ModalOptPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
