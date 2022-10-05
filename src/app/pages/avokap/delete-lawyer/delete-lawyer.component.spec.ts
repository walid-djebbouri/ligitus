import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLawyerComponent } from './delete-lawyer.component';

describe('DeleteLawyerComponent', () => {
  let component: DeleteLawyerComponent;
  let fixture: ComponentFixture<DeleteLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
