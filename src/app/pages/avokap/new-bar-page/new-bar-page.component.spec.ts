import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBarPageComponent } from './new-bar-page.component';

describe('NewBarPageComponent', () => {
  let component: NewBarPageComponent;
  let fixture: ComponentFixture<NewBarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
