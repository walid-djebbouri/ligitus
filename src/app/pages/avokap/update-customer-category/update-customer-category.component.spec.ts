import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerCategoryComponent } from './update-customer-category.component';

describe('UpdateCustomerCategoryComponent', () => {
  let component: UpdateCustomerCategoryComponent;
  let fixture: ComponentFixture<UpdateCustomerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
