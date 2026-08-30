import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { CustomerService } from '../services/customerService';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  standalone: true,S
})
export class Customers {
  private customerService =
    inject(CustomerService);


  errorMessage =
    signal('');


  customers$: Observable<Customer[]> =
    this.customerService
      .getAllCustomers()
      .pipe(

        catchError(error => {

          this.errorMessage.set(
            'Impossible de charger les clients.'
          );

          return of([]);

        })

      );
}
