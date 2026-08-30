import { Routes } from '@angular/router';
import { Accounts } from './accounts/accounts';
import { BankBot } from './bank-bot/bank-bot';
import { Dashboard } from './dashboard/dashboard';
import { Customers } from './customers/customers';
import { NewCustomer } from './new-customer/new-customer';
import { NewAccount } from './new-account/new-account';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'customers',
    component: Customers
  },

  {
    path: 'accounts',
    component: Accounts
  },

  {
    path: 'customers/new',
    component: NewCustomer
  },

  {
    path: 'accounts/new',
    component: NewAccount
  },

  {path: "bank-bot",
    component:BankBot
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
