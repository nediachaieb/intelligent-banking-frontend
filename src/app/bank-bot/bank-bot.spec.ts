import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBot } from './bank-bot';

describe('BankBot', () => {
  let component: BankBot;
  let fixture: ComponentFixture<BankBot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBot],
    }).compileComponents();

    fixture = TestBed.createComponent(BankBot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
