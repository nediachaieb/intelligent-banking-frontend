import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { CustomerService } from '../services/customerService';
import { Customer, CustomerListState } from '../model/customer.model';
import { LoadingService } from '../services/loading';
import { RequestStatus } from '../model/request-status.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  standalone: true,
})
export class Customers {
  private customerService =
    inject(CustomerService);

  public loadingService =
    inject(LoadingService);

  customers$: Observable<CustomerListState> =
    this.customerService
      .getAllCustomers()
      .pipe(
        map(customers =>(
          {
            customers:customers,
            status: RequestStatus.SUCCESS
          }

        )),
        catchError(error => {
          return of({
            customers: [],
            status: RequestStatus.ERROR,
            errorMessage:
              'Impossible de charger les clients.'
          });
        })

      );
  protected readonly RequestStatus =
    RequestStatus;
}
