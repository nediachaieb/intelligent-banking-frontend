import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  catchError,
  map,
  Observable,
  of
} from 'rxjs';

import { CustomerListState } from '../model/customer.model';
import { RequestStatus } from '../model/request-status.model';

import { CustomerService } from '../services/customerService';
import { LoadingService } from '../services/loading';


@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    AsyncPipe,
    RouterLink
  ]
})
export class Customers {

  private readonly customerService =
    inject(CustomerService);

  protected readonly loadingService =
    inject(LoadingService);
  protected readonly RequestStatus =
    RequestStatus;


  protected readonly customers$: Observable<CustomerListState> =
    this.customerService
      .getAllCustomers()
      .pipe(

        map(customers => ({
          customers,
          status: RequestStatus.SUCCESS
        })),

        catchError(() =>
          of({
            customers: [],
            status: RequestStatus.ERROR,
            errorMessage:
              'Impossible de charger les clients.'
          })
        )

      );



}
