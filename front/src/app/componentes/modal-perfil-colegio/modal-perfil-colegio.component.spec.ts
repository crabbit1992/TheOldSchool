import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPerfilColegioComponent } from './modal-perfil-colegio.component';

describe('ModalPerfilColegioComponent', () => {
  let component: ModalPerfilColegioComponent;
  let fixture: ComponentFixture<ModalPerfilColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPerfilColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPerfilColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
