import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { Account, AccountListState, RequestStatus } from '../model/account.model';
import { LoadingService } from '../services/loading';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
  standalone: true,
  imports: [
    AsyncPipe
  ]
})
export class Accounts {
  private http= inject(HttpClient);
  public loadingService = inject(LoadingService);
  accounts$:Observable<AccountListState> = this.http.get<Account[]>('http://localhost:9999/BANK-SERVICE/bankAccounts').pipe(
    map(resp => {
      return {
        accounts: resp,
        status: RequestStatus.SUCCESS

      }
    }),
    catchError((err, caught) => {
      return of({status: RequestStatus.ERROR, errorMessage: err.statusText});}

    )
  )


  protected readonly RequestStatus = RequestStatus;
}
