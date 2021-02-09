import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPersonaComponent } from './adm-persona.component';

describe('AdmPersonaComponent', () => {
  let component: AdmPersonaComponent;
  let fixture: ComponentFixture<AdmPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
