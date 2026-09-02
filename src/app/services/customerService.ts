import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, NewCustomerM } from '../model/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);

  private readonly apiUrlCustomer =`${environment.api.gateway}/CUSTOMER-SERVICE/customers`;


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
    customer: NewCustomerM
  ): Observable<Customer> {

    return this.http.post<Customer>(
      this.apiUrlCustomer,
      customer
    );


  }
}
