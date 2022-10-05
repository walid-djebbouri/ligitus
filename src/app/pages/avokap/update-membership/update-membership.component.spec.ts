import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMembershipComponent } from './update-membership.component';

describe('UpdateMembershipComponent', () => {
  let component: UpdateMembershipComponent;
  let fixture: ComponentFixture<UpdateMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMembershipComponent ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
