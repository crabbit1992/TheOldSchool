import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaVirtualComponent } from './aula-virtual.component';

describe('AulaVirtualComponent', () => {
  let component: AulaVirtualComponent;
  let fixture: ComponentFixture<AulaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
