import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCabinetComponent } from './update-cabinet.component';

describe('UpdateCabinetComponent', () => {
  let component: UpdateCabinetComponent;
  let fixture: ComponentFixture<UpdateCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
