import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(m => m.Dashboard)
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./customers/customers')
        .then(m => m.Customers)
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./accounts/accounts')
        .then(m => m.Accounts)
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./new-customer/new-customer')
        .then(m => m.NewCustomerComponent)
  },
  {
    path: 'accounts/new',
    loadComponent: () =>
      import('./new-account/new-account')
        .then(m => m.NewAccountComponent)
  },
  {
    path: 'bank-bot',
    loadComponent: () =>
      import('./bank-bot/bank-bot')
        .then(m => m.BankBot)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
//L’intérêt du lazy loading, c’est de ne pas charger tout le frontend Angular dès l’ouverture de l’application.
