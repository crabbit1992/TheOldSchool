import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptAulaVirtualComponent } from './modal-opt-aula-virtual.component';

describe('ModalOptAulaVirtualComponent', () => {
  let component: ModalOptAulaVirtualComponent;
  let fixture: ComponentFixture<ModalOptAulaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptAulaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptAulaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
