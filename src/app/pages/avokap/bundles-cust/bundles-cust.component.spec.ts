import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesCustComponent } from './bundles-cust.component';

describe('BundlesCustComponent', () => {
  let component: BundlesCustComponent;
  let fixture: ComponentFixture<BundlesCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
