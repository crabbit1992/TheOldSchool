import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuColComponent } from './perfil-usu-col.component';

describe('PerfilUsuColComponent', () => {
  let component: PerfilUsuColComponent;
  let fixture: ComponentFixture<PerfilUsuColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
