import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPaginaColComponent } from './inicio-pagina-col.component';

describe('InicioPaginaColComponent', () => {
  let component: InicioPaginaColComponent;
  let fixture: ComponentFixture<InicioPaginaColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioPaginaColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPaginaColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
