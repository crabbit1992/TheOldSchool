import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAlumnoComponent } from './vista-alumno.component';

describe('VistaAlumnoComponent', () => {
  let component: VistaAlumnoComponent;
  let fixture: ComponentFixture<VistaAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
