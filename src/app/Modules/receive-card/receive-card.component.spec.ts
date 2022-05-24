import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCardComponent } from './receive-card.component';

describe('ReceiveCardComponent', () => {
  let component: ReceiveCardComponent;
  let fixture: ComponentFixture<ReceiveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
