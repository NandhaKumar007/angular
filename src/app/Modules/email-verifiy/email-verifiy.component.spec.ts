import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifiyComponent } from './email-verifiy.component';

describe('EmailVerifiyComponent', () => {
  let component: EmailVerifiyComponent;
  let fixture: ComponentFixture<EmailVerifiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerifiyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
