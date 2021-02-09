import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCargoComponent } from './mantenimiento-cargo.component';

describe('MantenimientoCargoComponent', () => {
  let component: MantenimientoCargoComponent;
  let fixture: ComponentFixture<MantenimientoCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
