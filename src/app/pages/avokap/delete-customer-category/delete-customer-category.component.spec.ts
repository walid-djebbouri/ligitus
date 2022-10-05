import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerCategoryComponent } from './delete-customer-category.component';

describe('DeleteCustomerCategoryComponent', () => {
  let component: DeleteCustomerCategoryComponent;
  let fixture: ComponentFixture<DeleteCustomerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustomerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
