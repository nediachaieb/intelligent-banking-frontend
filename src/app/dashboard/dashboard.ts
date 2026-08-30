import { Component, inject } from '@angular/core';
import { CustomerService } from '../services/customerService';
import { AccountService } from '../services/accountService';
import { forkJoin, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface DashboardStats {


  customers: number;

  accounts: number;

  activeAccounts: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {

  private customerService =
    inject(CustomerService);

  private accountService =
    inject(AccountService);

  stats$: Observable<DashboardStats> =
    forkJoin({

      customers:
        this.customerService.getAllCustomers(),

      accounts:
        this.accountService.getAllAccounts()

    }).pipe(

      map(({ customers, accounts }) => {

        return {

          customers:
          customers.length,

          accounts:
          accounts.length,

          activeAccounts:
          accounts.filter(
            account =>
              account.status === 'ACTIVATED'
          ).length

        };

      })
    );




}
