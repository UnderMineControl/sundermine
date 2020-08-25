import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModdetailsComponent } from './moddetails.component';

describe('ModdetailsComponent', () => {
  let component: ModdetailsComponent;
  let fixture: ComponentFixture<ModdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
