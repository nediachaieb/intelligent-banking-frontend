import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { AccountListState} from '../model/account.model';
import { LoadingService } from '../services/loading';
import { AccountService } from '../services/accountService';
import { RequestStatus } from '../model/request-status.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ]
})
export class Accounts {
  private accountService =
    inject(AccountService)
  public loadingService = inject(LoadingService);
  accounts$: Observable<AccountListState> =
    this.accountService
      .getAllAccounts()
      .pipe(

        map(accounts => ({
          accounts: accounts,
          status: RequestStatus.SUCCESS
        })),

        catchError(error => {

          return of({
            accounts: [],
            status: RequestStatus.ERROR,
            errorMessage:
              'Impossible de charger les comptes.'
          });

        })

      );

  protected readonly RequestStatus = RequestStatus;
}
