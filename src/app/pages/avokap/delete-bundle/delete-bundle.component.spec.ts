import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBundleComponent } from './delete-bundle.component';

describe('DeleteBundleComponent', () => {
  let component: DeleteBundleComponent;
  let fixture: ComponentFixture<DeleteBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
