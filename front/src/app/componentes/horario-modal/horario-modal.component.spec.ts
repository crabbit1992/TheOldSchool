import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioModalComponent } from './horario-modal.component';

describe('HorarioModalComponent', () => {
  let component: HorarioModalComponent;
  let fixture: ComponentFixture<HorarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
