import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilColegioComponent } from './perfil-colegio.component';

describe('PerfilColegioComponent', () => {
  let component: PerfilColegioComponent;
  let fixture: ComponentFixture<PerfilColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
