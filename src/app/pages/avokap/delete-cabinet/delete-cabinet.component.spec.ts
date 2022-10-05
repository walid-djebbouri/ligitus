import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCabinetComponent } from './delete-cabinet.component';

describe('DeleteCabinetComponent', () => {
  let component: DeleteCabinetComponent;
  let fixture: ComponentFixture<DeleteCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
