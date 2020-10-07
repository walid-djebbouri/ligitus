import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCabinetComponent } from './create-cabinet.component';

describe('CreateCabinetComponent', () => {
  let component: CreateCabinetComponent;
  let fixture: ComponentFixture<CreateCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
