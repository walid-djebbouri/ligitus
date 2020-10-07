import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetDetailsComponent } from './cabinet-details.component';

describe('CabinetDetailsComponent', () => {
  let component: CabinetDetailsComponent;
  let fixture: ComponentFixture<CabinetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
