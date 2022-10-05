import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCabinetComponent } from './change-cabinet.component';

describe('ChangeCabinetComponent', () => {
  let component: ChangeCabinetComponent;
  let fixture: ComponentFixture<ChangeCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
