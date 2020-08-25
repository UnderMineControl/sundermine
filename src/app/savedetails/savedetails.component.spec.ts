import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedetailsComponent } from './savedetails.component';

describe('SavedetailsComponent', () => {
  let component: SavedetailsComponent;
  let fixture: ComponentFixture<SavedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
