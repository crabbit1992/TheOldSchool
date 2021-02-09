import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaColComponent } from './galeria-col.component';

describe('GaleriaColComponent', () => {
  let component: GaleriaColComponent;
  let fixture: ComponentFixture<GaleriaColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
