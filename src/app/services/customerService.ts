import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, NewCustomer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);

  private readonly apiUrlCustomer =
    'http://localhost:9999/CUSTOMER-SERVICE/customers';


  getAllCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(
      this.apiUrlCustomer
    );
  }
  getCustomerById(id: number): Observable<Customer> {

    return this.http.get<Customer>(
      `${this.apiUrlCustomer}/${id}`
    );
  }

  createCustomer(
    customer: NewCustomer
  ): Observable<Customer> {

    return this.http.post<Customer>(
      this.apiUrlCustomer,
      customer
    );


  }
}
