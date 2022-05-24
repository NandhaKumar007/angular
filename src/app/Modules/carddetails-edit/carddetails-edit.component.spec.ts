import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddetailsEditComponent } from './carddetails-edit.component';

describe('CarddetailsEditComponent', () => {
  let component: CarddetailsEditComponent;
  let fixture: ComponentFixture<CarddetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
