import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptBarraComponent } from './modal-opt-barra.component';

describe('ModalOptBarraComponent', () => {
  let component: ModalOptBarraComponent;
  let fixture: ComponentFixture<ModalOptBarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptBarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
