import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagoComponent } from './modal-pago.component';

describe('ModalPagoComponent', () => {
  let component: ModalPagoComponent;
  let fixture: ComponentFixture<ModalPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
