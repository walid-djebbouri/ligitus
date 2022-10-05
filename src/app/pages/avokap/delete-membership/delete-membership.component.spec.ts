import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMembershipComponent } from './delete-membership.component';

describe('DeleteMembershipComponent', () => {
  let component: DeleteMembershipComponent;
  let fixture: ComponentFixture<DeleteMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
