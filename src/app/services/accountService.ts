import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, NewAccount } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private http=inject(HttpClient)
  private readonly apiUrlAccount =
    'http://localhost:9999/BANK-SERVICE/bankAccounts';


  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(
      this.apiUrlAccount
    );
  }


  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(
      `${this.apiUrlAccount}/${id}`
    );
  }


  createAccount(
    account: NewAccount
  ): Observable<Account> {

    return this.http.post<Account>(
      this.apiUrlAccount,
      account
    );
  }
}
