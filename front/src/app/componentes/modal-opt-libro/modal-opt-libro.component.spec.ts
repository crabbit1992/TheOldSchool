import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptLibroComponent } from './modal-opt-libro.component';

describe('ModalOptLibroComponent', () => {
  let component: ModalOptLibroComponent;
  let fixture: ComponentFixture<ModalOptLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
