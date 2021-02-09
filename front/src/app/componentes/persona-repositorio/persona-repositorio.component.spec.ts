import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaRepositorioComponent } from './persona-repositorio.component';

describe('PersonaRepositorioComponent', () => {
  let component: PersonaRepositorioComponent;
  let fixture: ComponentFixture<PersonaRepositorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaRepositorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
