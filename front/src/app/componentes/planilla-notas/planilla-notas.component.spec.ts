import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaNotasComponent } from './planilla-notas.component';

describe('PlanillaNotasComponent', () => {
  let component: PlanillaNotasComponent;
  let fixture: ComponentFixture<PlanillaNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
