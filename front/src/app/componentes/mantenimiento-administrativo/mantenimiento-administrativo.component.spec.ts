import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoAdministrativoComponent } from './mantenimiento-administrativo.component';

describe('MantenimientoAdministrativoComponent', () => {
  let component: MantenimientoAdministrativoComponent;
  let fixture: ComponentFixture<MantenimientoAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
