import { Routes } from '@angular/router';
import { Accounts } from './accounts/accounts';
import { BankBot } from './bank-bot/bank-bot';


export const routes: Routes = [
  { path: "accounts",component:Accounts},
  {path: "bankBot",component:BankBot},



];
