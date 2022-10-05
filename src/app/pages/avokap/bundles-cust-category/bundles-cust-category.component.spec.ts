import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesCustCategoryComponent } from './bundles-cust-category.component';

describe('BundlesCustCategoryComponent', () => {
  let component: BundlesCustCategoryComponent;
  let fixture: ComponentFixture<BundlesCustCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesCustCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesCustCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
